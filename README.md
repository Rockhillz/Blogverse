# Project Overview
Blogverse is a test blog website

# Project Structure
This project is structured into two main folders:
- **frontend/**: React.js frontend
- **backend/**: Express.js backend
## Getting Started
To run blogverse locally
**Clone the Repository**:
   ```bash
https://github.com/Rockhillz/Blogverse.git
   ```

### Backend Setup

1. Navigate to the backend folder:
   
```
cd backend
```
2. Install dependencies
```
npm install
  ```
3. Set up environmental variables
- Create a .env file in the backend/ folder and add the following:
   ```
     MONGODB_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
  ```
4. Start the backend server
```
   npm start
```
5. [Backend deployed server link](https://blogverse-7xfw.onrender.com)

### Frontend Setup
1. Navigate to the backend folder:
   
```
cd frontend
```
2. Install dependencies
```
npm install
  ```
3. Set up environmental variables
- Create a .env file in the frontend/ folder and add this. **Note: if you change port at the backend, change here**:
   ```
    VITE_API_BASE_URL=http://localhost:8020/api
  ```
4. Start the backend server
```
   npm run dev
```

## Design Choices
- Frontend: Built with React.js and Material UI for UI styling. React Bootstrap used For Navigation Bar.
- Backend: Uses Express.js with MongoDB for database management.
- Authentication: JSON Web Tokens (JWT) are used for user authentication.
- Security: Implemented rate limiting to prevent abuse.
- Testing: Jest and Supertest are used for backend testing. Jest also used for frontend testing.
- API Documentation: Swagger is used to generate API documentation. [docs](https://blogverse-7xfw.onrender.com/api-docs/)

## Dependencies
### Backend
- bcryptjs
- cors
- dotenv
- express
- express-rate-limit
- jsonwebtoken
- mongodb
- mongoose
- swagger-jsdoc
- swagger-ui-express
### Frontend
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- bootstrap
- jwt-decode
- react
- react-bootstrap
- react-dom
- react-icons
- react-router-dom
- react-toastify

## Running Test
### Backend
Run Jest tests in the backend:
```
cd backend
npm test
```

### Frontend
```
cd backend
npm test
```
## API Documentation
Swagger is used to document the API endpoints. To view the API documentation:
1. Start the backend server.
2. Open your browser and navigate to:
```
http://localhost:5000/api-docs
```
3. Live API link
```
https://blogverse-7xfw.onrender.com/api-docs/
```
