# MERN Authentication API with JWT

A robust and secure authentication API built with Node.js, Express, and MongoDB, featuring JWT-based authentication and email verification.

## Features

- 🔐 Secure JWT-based Authentication
- 📧 Email Verification System
- 👤 User Session Management
- 🛡️ Protected Routes
- 🔒 Password Encryption
- ⚡ Express.js Framework
- 🗄️ MongoDB Database
- ✅ Input Validation using Zod

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Email Service**: Resend
- **Input Validation**: Zod
- **Other Tools**: 
  - cors (Cross-Origin Resource Sharing)
  - cookie-parser (Cookie handling)
  - dotenv (Environment variables)

## Project Structure

```
src/
├── configs/        # Configuration files (database, etc.)
├── constants/      # Constant values and enums
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── models/        # MongoDB models
├── routes/        # API routes
├── services/      # Business logic
└── utils/         # Utility functions
```

## Getting Started

1. **Clone the repository**
```bash
git clone [repository-url]
cd mern-auth-jwt-cloned
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on port 4004 by default.

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/verify-email` - Verify email address
- `POST /auth/logout` - Logout user

### Protected Routes
- `GET /user` - Get user profile (requires authentication)
- `GET /sessions` - Get user sessions (requires authentication)

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- HTTP-only cookies for token storage
- CORS protection
- Input validation and sanitization
- Protected routes middleware

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## License

ISC

## Author

[Your Name]
