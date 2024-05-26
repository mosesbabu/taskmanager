# Issue Tracker Application

This project is a web application for submitting and tracking issues. It includes an Express backend with MongoDB for data storage and a React frontend. The application features authentication, form validation, email notifications, and SMS notifications.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Frontend Components](#frontend-components)
- [Technologies Used](#technologies-used)
- [License](#license)

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB Atlas account
- Twilio account
- Gmail account for email notifications

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/issue-tracker.git
    cd issue-tracker
    ```

2. **Backend Setup:**
    - Navigate to the backend directory:
        ```sh
        cd backend
        ```
    - Install backend dependencies:
        ```sh
        npm install
        ```
    - Create a `.env` file in the `backend` directory and add your environment variables:
        ```
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        EMAIL_USER=your_email@gmail.com
        EMAIL_PASS=your_email_password
        TWILIO_ACCOUNT_SID=your_twilio_account_sid
        TWILIO_AUTH_TOKEN=your_twilio_auth_token
        TWILIO_PHONE_NUMBER=your_twilio_phone_number
        ```

3. **Frontend Setup:**
    - Navigate to the frontend directory:
        ```sh
        cd ../frontend
        ```
    - Install frontend dependencies:
        ```sh
        npm install
        ```

## Running the Application

1. **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```

2. **Start the frontend server:**
    ```sh
    cd frontend
    npm start
    ```

3. The application should now be running at `http://localhost:3000`.

## Project Structure

