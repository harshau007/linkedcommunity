# LinkedCommunity - Social Media Platform

A modern social media platform built with Next.js and Express.js, featuring real-time post interactions and user engagement.

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Zustand** - State management
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend

- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **helmet** - Security middleware

## 📋 Features

### Core Features

- **User Authentication** - Register, login, and logout functionality
- **Post Creation** - Create and publish posts with content
- **Feed System** - Infinite scroll feed with pagination
- **User Profiles** - View user profiles and their posts
- **Real-time Interactions** - Like/unlike posts

### Extra Features

- **Like System** - Like and unlike posts
- **Optimistic Updates** - Instant UI feedback for better UX

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/linkedcommunity
cd linkedcommunity
```

### 2. Install Dependencies

#### Frontend Dependencies

```bash
npm install
```

#### Backend Dependencies

```bash
cd api
npm install
```

### 3. Environment Configuration

#### Frontend (.env.local)

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

#### Backend (.env)

Create a `.env` file in the `api` directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/linkedcommunity
JWT_SECRET=your-super-secret-jwt-key-here
CORS_ORIGIN="http://localhost:3000"
```

### 4. Database Setup

1. Start MongoDB service
2. The application will automatically create the database and collections on first run

### 5. Start the Application

#### Start Backend Server

```bash
cd api
npm run dev
```

The backend will start on `http://localhost:8080`

#### Start Frontend Development Server

```bash
# In a new terminal, from the root directory
npm run dev
```

The frontend will start on `http://localhost:3000`

### 6. Build for Production

#### Backend

```bash
cd api
npm run build
npm start
```

#### Frontend

```bash
npm run build
npm start
```

## 👤 Demo User Credentials

You can use the following demo account to test the application:

- **Email:** `demo@example.com`
- **Password:** `demo@4321`

## 🎯 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Posts

- `GET /posts` - Get posts with pagination
- `POST /posts` - Create a new post
- `POST /posts/:postId/like` - Like/unlike a post

### Users

- `GET /users/:userId` - Get user profile
- `GET /users/:userId/posts` - Get user's posts

## 🔧 Development

### Project Structure

```
linkedcommunity/
      ├── src/                    # Frontend source code
      │   ├── app/               # Next.js app router pages
      │   ├── components/        # React components
      │   ├── lib/              # Utilities and API client
      │   ├── store/            # Zustand state management
      │   └── types/            # TypeScript type definitions
      ├── api/                   # Backend source code
      │   ├── src/
      │   │   ├── controllers/  # Route controllers
      │   │   ├── middleware/   # Express middleware
      │   │   ├── models/       # Mongoose models
      │   │   ├── routes/       # API routes
      │   │   └── utils/        # Utility functions
      │   └── package.json
      └── package.json
```

### Available Scripts

#### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

#### Backend

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Render)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push to main branch

### Database (MongoDB Atlas)

1. Create a MongoDB Atlas cluster
2. Update the `MONGODB_URI` environment variable
3. Configure network access and database users
