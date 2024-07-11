# TalkToData

![Project Logo](logo.png)

## Introduction

The TalkToData project addresses the challenge of data management and analysis for users who lack database expertise. The project aims to facilitate data-driven decision-making across various domains by providing user-friendly tools for data manipulation and analysis.


## Objectives

- **Dataset Loading**: Upload and view CSV/Excel datasets.
- **Query (talk to) Data**: Query datasets without SQL setup through natural language.
- **Admin Dashboard**: Admin-level authorization for analyzing frequent queries and active users.


## Business Rules

1. **Authorization**: Admins have exclusive access to certain APIs.
2. **File Management**: Users can manage multiple files with access restrictions.
3. **Query Session Management**: Track and view query history.
4. **Data Integrity**: Foreign key constraints enforce referential integrity.

## Developer Setup

### PostgreSQL

1. Install PostgreSQL.
2. Create user and database:
    ```sh
    createuser test
    createdb User
    ```
3. Configure in `Flask app.py`:
    ```python
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/Database'
    ```

### MongoDB

1. Install MongoDB Community Edition.
2. Create a MongoDB Atlas account and set up a cluster.
3. Create a new database user and connect using the provided URI.

## Methodology

### Frontend

- **React**: User-friendly and component-based.
- **Redux**: Scalable state management.
- **Routing**: React Router and Axios.
- **Styling**: Tailwind CSS and SASS.
- **API**: Fetch API for front-end to back-end communication.

### Backend

- **Tech Stack**: MongoDB, Express.js, Node.js.
- **Dual Server**: Flask for managing models; Express.js for sessions.
- **Security**: Python's built-in hashing functions.
- **Version Control**: Git and GitHub.

## Pages Developed

- **Landing/Login Page**: Authentication required.
- **Register Page**: Profile creation.
- **Upload/Load Dataset Page**: Load datasets.
- **Query Page**: Query datasets.
- **Workflows Page**: View query history and results.
- **Profile Page**: Manage profile and files.
- **Admin Dashboard**: View query usage and active users.

## References

1. [Source code](https://github.com/ajaypokharel/storeDB)
2. [React.js Documentation](https://reactjs.org/docs/getting-started.html)
3. [Flask Documentation](https://flask.palletsprojects.com/en/2.0.x/)
4. [PostgreSQL Documentation](https://www.postgresql.org/docs/)
5. [MongoDB Documentation](https://docs.mongodb.com/)
