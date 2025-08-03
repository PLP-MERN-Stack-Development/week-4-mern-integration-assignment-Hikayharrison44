# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
 ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.56.1:8080/

  # MERN Blog Platform

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. This project demonstrates seamless integration between front-end and back-end components, including database operations, API communication, and state management.

## 🚀 Features

- RESTful API for blog posts and categories
- Full CRUD functionality for posts
- User authentication (JWT-based)
- Image upload for featured images
- Pagination, search, and filtering
- Comments on blog posts
- Responsive UI with React and Tailwind CSS

## 📂 Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   ```

2. **Install server dependencies:**
   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**
   ```sh
   cd client
   npm install
   ```

4. **Configure environment variables:**
   - Copy `.env.example` to `.env` in both `client` and `server` directories.
   - Update values as needed (see [`.env`](.env)).

5. **Start development servers:**
   ```sh
   # In server directory
   npm run dev

   # In client directory
   npm run dev
   ```

## 🧪 API Documentation

### Posts
- `GET /api/posts` - Get all blog posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

## 🧩 Solution Overview

- **Backend:** Built with Express.js and Mongoose. Implements RESTful endpoints, JWT authentication, input validation, and error handling middleware.
- **Frontend:** Built with React and Vite. Uses React Router for navigation, hooks for state management, and custom hooks for API calls. Features forms with validation and optimistic UI updates.
- **Integration:** API service in React communicates with Express backend. State management for posts and categories. Handles loading and error states.
- **Advanced Features:** User authentication, image uploads, pagination, search/filter, and comments.

## 📸 Screenshots

_Add screenshots of your application here._

## 📚 Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## ✅ Submission

- Complete both client and server code
- Include `.env.example` files
- Document your API and setup process
- Add screenshots of your application

---