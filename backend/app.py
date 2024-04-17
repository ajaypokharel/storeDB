import os, io
import random
from dotenv import load_dotenv

from flask import Flask, request, render_template, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user

from werkzeug.security import generate_password_hash, check_password_hash

import pandas as pd
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import seaborn as sns


load_dotenv()

def get_secrect_key():
    data = os.environ.get("SECRET_KEY")
    return data

app = Flask(__name__)
app.secret_key = get_secrect_key()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ajaypokharel:12345@localhost/User'
app.config['UPLOAD_FOLDER'] = 'uploads'

db = SQLAlchemy(app)
login_manager = LoginManager(app)

# User model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100), unique=False, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'username': self.username, 'email': self.email, 'full_name': self.full_name}

# Uploaded file Model
class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), unique=True, nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/signup', methods=['POST'])
def signup_post():
    # code to validate and add user to database goes here
    email = request.json.get('email')
    username = request.json.get('username')
    full_name = request.json.get('full_name')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again
        return jsonify({"message": "User Already Found for this email"})

    # create a new user with the form data. Hash the password so the plaintext version isn't saved.
    new_user = User(email=email, username=username, password=generate_password_hash(password, method='pbkdf2', salt_length=10), full_name=full_name)

    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'User loggedin succesfully'})
    else:
        return 'Invalid username or password'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'User loggedOut!'})

@app.route('/profile/<int:user_id>', methods=['GET', 'DELETE'])
@login_required
def profile(user_id):
    user = User.query.get_or_404(user_id)
    if user != current_user:
        return 'Unauthorized', 403

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        logout_user()
        return 'Profile deleted successfully'

    return jsonify({'username': user.username, 'email': user.email})

@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get user information from database.
    Parameters:
        - user_id (int): Unique identifier for user.
    Returns:
        - dict: Dictionary containing user information.
    Processing Logic:
        - Query database for user information.
        - Convert user information to dictionary.
        - Return dictionary as JSON response."""
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict())

@app.route('/upload', methods=['POST'])
@login_required
def upload_file():
    file = request.files['file']
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    uploaded_file = UploadedFile(filename=filename, filepath=filepath, user_id=current_user.id)
    db.session.add(uploaded_file)
    db.session.commit()
    return jsonify({'message': 'File uploaded successfully'}), 201


@app.route('/query', methods=['POST'])
@login_required
def query_file():
    data = request.json
    file_id = data['file_id']
    query = data['query']

    uploaded_file = UploadedFile.query.get_or_404(file_id)
    file_path = uploaded_file.filepath

    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path, encoding='unicode_escape')
    elif file_path.endswith('.xlsx'):
        df = pd.read_excel(file_path, encoding='unicode_escape')
    else:
        return jsonify({'error': 'Unsupported file format'})

    try:
        result = df.query(query).to_dict(orient='records')
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/histogram', methods=['POST'])
@login_required
def histogram():
    data = request.json
    file_id = data['file_id']
    column = data['column']

    uploaded_file = UploadedFile.query.get_or_404(file_id)
    file_path = uploaded_file.filepath

    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path, encoding='unicode_escape')
    elif file_path.endswith('.xlsx'):
        data = pd.read_excel(file_path, encoding='unicode_escape')
    else:
        return jsonify({'error': 'Unsupported file format'})
    
    #  create_histogram():
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    axis.hist(data[column], bins=range(min(data[column]), max(data[column]) + 1), edgecolor='black')
    axis.set_title('Histogram')
    axis.set_xlabel('Value')
    axis.set_ylabel('Frequency')

    # Save histogram image to a file
    img_bytes = io.BytesIO()
    FigureCanvas(fig).print_png(img_bytes)
    return Response(img_bytes.getvalue(), mimetype='image/png')

@app.route('/plot', methods=['POST'])
@login_required
def plot_scatter():
    data = request.json
    file_id = data['file_id']
    x = data['x']
    y = data['y']

    uploaded_file = UploadedFile.query.get_or_404(file_id)
    file_path = uploaded_file.filepath

    if file_path.endswith('.csv'):
        data = pd.read_csv(file_path, encoding='unicode_escape')
    elif file_path.endswith('.xlsx'):
        data = pd.read_excel(file_path, encoding='unicode_escape')
    else:
        return jsonify({'error': 'Unsupported file format'})
    
    xs = data[x]
    ys = data[y]
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    axis.scatter(xs, ys)
    axis.set_title('Scatter Plot')
    axis.set_xlabel(x)
    axis.set_ylabel(y)

    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')

@app.before_request
def create_tables():
    db.create_all()

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
