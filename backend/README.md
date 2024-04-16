# Project Backend Documentation

Welcome to the documentation for our Flask backend project. This guide will walk you through the steps required to set up and run the backend server.

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- Python 3.x
- Pip (Python package manager)

## Setup

Follow these steps to set up the project:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/ajaypokharel/storeDB.git
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd backend
   ```

3. **Create a Virtual Environment** (Optional but Recommended):
   ```bash
   python3 -m venv venv
   ```

4. **Activate the Virtual Environment**:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```

5. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

Before running the server, you might need to configure some settings. 

1. **Database Configuration**:
- Create a postgresql database name User and
-  `app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/Database'`
   Use the format above to connect and setup a postgresql server

## Running the Server

Once the setup and configuration are complete, you can run the backend server using the following steps:

1. **Start the Flask Server**:
   ```bash
   flask run
   ```

2. **Access the API**:
   The server will start running at `http://127.0.0.1:5000/` by default. You can access the API endpoints using this base URL.

## API Endpoints

Look at app.py for API endpoints created so far

