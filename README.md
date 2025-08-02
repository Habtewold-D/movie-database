# Movie Database

A full-stack movie database application with user authentication, movie management, and chatbot recommendations.

## Project Structure

- `frontend/` - React frontend application
- `backend/` - Node.js/Express backend API

## Backend Deployment on Render

### Environment Variables Required

Set these environment variables in your Render dashboard:

- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `PORT` - Server port (Render will set this automatically)

### Build Configuration

The root `package.json` is configured for Render deployment:
- Build Command: `npm run build`
- Start Command: `npm start`

## Local Development

1. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Set up environment variables in `backend/.env`

3. Start the development servers:
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm start
   ``` 