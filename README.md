# Workout Management system - MERN Stack Application

Author:
Name: M.Umar Farooq
Email: m.umarfarooq0045@gmail.com


A full-stack workout tracking application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- ✅ Create, read, and delete workouts
- ✅ Modern, responsive UI design
- ✅ Real-time data synchronization
- ✅ Error handling and loading states
- ✅ Mobile-friendly interface

## Project Structure

```
Mern-Stack/
├── frontend/
│   └── react/
│       ├── src/
│       │   ├── components/
│       │   │   └── Navbar.jsx
│       │   ├── pages/
│       │   │   ├── Home.jsx
│       │   │   └── Home.css
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── main.jsx
│       │   └── index.css
│       └── package.json
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    │   └── workout.js
    ├── server.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   Mongo_uri=mongodb://localhost:27017/workout-buddy
   PORT=4000
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend/react directory:
   ```bash
   cd frontend/react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get a specific workout
- `POST /api/workouts` - Create a new workout
- `DELETE /api/workouts/:id` - Delete a workout
- `PATCH /api/workouts/:id` - Update a workout

## Frontend-Backend Integration

The frontend is configured to communicate with the backend API at `http://localhost:4000/api/workouts`. The integration includes:

- CORS configuration for cross-origin requests
- Error handling for API failures
- Loading states for better UX
- Real-time data updates

## Technologies Used

### Frontend
- React.js 18
- React Router DOM
- CSS3 with custom properties
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS middleware
- Environment variables with dotenv

## Running the Application

1. Start MongoDB service
2. Start the backend server (`npm run dev` in backend directory)
3. Start the frontend development server (`npm run dev` in frontend/react directory)
4. Open `http://localhost:5173` in your browser

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License. 