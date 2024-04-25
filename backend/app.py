import os, io
from dotenv import load_dotenv
import json

from flask import Flask, request, render_template, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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
CORS(app)
app.secret_key = get_secrect_key()
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ajaypokharel:12345@localhost/User'
app.config['UPLOAD_FOLDER'] = 'uploads'

db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    full_name = db.Column(db.String(100), unique=False, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    uploaded_files = db.relationship('UploadedFile', backref='user', lazy=True)
    is_admin = db.Column(db.Boolean, default=False)
    is_logged_in = db.Column(db.Boolean, default=False) 

    def to_dict(self):
        return {'id': self.id, 'username': self.username, 'email': self.email, 'full_name': self.full_name}

# Uploaded file Model
class UploadedFile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(100), unique=True, nullable=False)
    filepath = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {'id': self.id, 'filename': self.filename, 'filepath': self.filepath, 'user_id': self.user_id}


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


@app.route('/make-admin/<int:user_id>', methods=['POST'])
def make_admin(user_id):
    user = User.query.get(user_id)
    if user:
        user.is_admin = True
        db.session.commit()
        return jsonify({'message': f'User with ID {user_id} is now an admin'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        user.is_logged_in = True
        db.session.commit()
        return jsonify({'username': user.username, 'email': user.email, 'user_id': user.id})
    else:
        return 'Invalid username or password'

@app.route('/logout', methods=['POST'])
def logout():
    user_id = request.form['user_id']
    user = User.query.get_or_404(user_id)

    if user:
        user.is_logged_in = False
        db.session.commit()
        return jsonify({'message': 'User loggedOut succesfully'})
    else:
        return jsonify({'message': 'Invalid username'})

@app.route('/profile/<int:user_id>', methods=['GET', 'DELETE', 'PUT'])
def profile(user_id):
    user = User.query.get_or_404(user_id)

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return 'Profile deleted successfully' 
    return jsonify({'username': user.username, 'email': user.email})

@app.route('/check-admin/<int:user_id>', methods=['GET'])
def check_admin(user_id):
    user = User.query.get_or_404(user_id)

    if user.is_admin:
        return jsonify({'result': True})
    else:
        return jsonify({'result': False})

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    user_id = request.form['user_id']
    # authenticate users
    user = User.query.get_or_404(user_id)
    if user.is_logged_in == False:
        return jsonify({"message": "Not Authenticated"}), 401
    
    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    uploaded_file = UploadedFile(filename=filename, filepath=filepath, user_id=user_id)
    db.session.add(uploaded_file)
    db.session.commit()
    return jsonify({'message': 'File uploaded successfully'}), 201

@app.route('/uploaded/<int:user_id>', methods=['GET'])
def get_uploaded_files(user_id):
    user = User.query.get_or_404(user_id)
    if user.is_logged_in == False:
        return jsonify({"message": "Not Authenticated"}), 401
    uploaded_files = [file.to_dict() for file in user.uploaded_files]
    return jsonify(uploaded_files), 200

@app.route('/users/<int:user_id>/uploaded/<int:file_id>', methods=['GET', 'DELETE'])
def get_uploaded_file(user_id, file_id):
    try:
        user = User.query.get_or_404(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # authenticate users
        if user.is_logged_in == False:
            return jsonify({"message": "Not Authenticated"}), 401

        # Query the UploadedFile by its ID
        file = UploadedFile.query.filter_by(id=file_id, user_id=user_id).first()

        if not file:
            return jsonify({'error': 'File not found'}), 404
  
        if request.method == 'DELETE':
            db.session.delete(file)
            db.session.commit()
            return jsonify({'message': 'File Deleted Successfully'}), 200

        return jsonify({'filename': file.filename}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/query', methods=['POST'])
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
        result_json = [json.loads(json.dumps(record)) for record in result]
        return result_json
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/histogram', methods=['POST'])
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
