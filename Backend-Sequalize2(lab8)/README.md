# 🎓 School Management System - Backend API

A comprehensive RESTful API built with **Express.js**, **Sequelize ORM**, and **MySQL** for managing educational institutions. Features complete CRUD operations, user authentication, role-based access control, and comprehensive API documentation.

## 🌟 Features

### Core Functionality
- 🧑‍🎓 **Student Management** - Complete CRUD operations for student records
- 🧑‍🏫 **Teacher Management** - Full teacher profile and course assignment management
- � **Course Management** - Course creation, enrollment, and scheduling
- � **Authentication & Authorization** - JWT-based secure user authentication
- 👥 **User Management** - Multi-role user system with proper access controls

### Advanced Features
- 🔄 **Database Relationships**:
  - One Teacher teaches many Courses
  - Many Students enroll in many Courses (Many-to-Many)
  - User-based authentication with role management
- � **API Documentation** - Interactive Swagger UI documentation
- 🎲 **Data Seeding** - Faker.js integration for generating realistic test data
- 🌐 **CORS Support** - Frontend integration ready
- 🔒 **Secure Middleware** - Protected routes and authentication middleware

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### 1. Install

npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management_db
DB_PORT=3306

# Server Configuration
PORT=4000

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Environment
NODE_ENV=development
```

### 3. Database Setup

```bash
# Create database (make sure MySQL is running)
mysql -u root -p -e "CREATE DATABASE school_management_db;"

# Run the application (it will create tables automatically)
npm run dev
```

### 4. Seed Sample Data (Optional)

```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

## 📚 API Documentation

Interactive Swagger documentation is available at:
```
http://localhost:4000/docs
```

### API Endpoints Overview

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

#### Students
- `GET /students` - Get all students (with pagination)
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student

#### Teachers
- `GET /teachers` - Get all teachers
- `GET /teachers/:id` - Get teacher by ID
- `POST /teachers` - Create new teacher
- `PUT /teachers/:id` - Update teacher
- `DELETE /teachers/:id` - Delete teacher

#### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID
- `POST /courses` - Create new course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

## 🏗️ Project Structure

```
Backend-Sequalize2(lab8)/
├── src/
│   ├── index.js                 # Application entry point
│   ├── seed.js                  # Database seeder
│   ├── config/
│   │   ├── db.config.js         # Database configuration
│   │   └── swagger.js           # Swagger documentation setup
│   ├── controllers/             # Route controllers
│   │   ├── auth.controller.js   # Authentication logic
│   │   ├── student.controller.js
│   │   ├── teacher.controller.js
│   │   └── course.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT authentication middleware
│   ├── models/                  # Sequelize models
│   │   ├── index.js            # Model associations
│   │   ├── user.model.js       # User authentication model
│   │   ├── student.model.js
│   │   ├── teacher.model.js
│   │   └── course.model.js
│   └── routes/                  # Express routes
│       ├── auth.routes.js
│       ├── student.routes.js
│       ├── teacher.routes.js
│       ├── course.routes.js
│       ├── user.routes.js
│       └── protected.routes.js
├── utils/
│   └── auth.js                  # Authentication utilities
├── package.json
├── .env                         # Environment variables
└── README.md
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with nodemon |
| `npm run seed` | Populate database with sample data |
| `npm test` | Run tests (to be implemented) |

## 🔧 Technologies & Dependencies

### Core Technologies
- **Express.js** `^5.1.0` - Fast, unopinionated web framework
- **Sequelize** `^6.37.7` - Promise-based ORM for Node.js
- **MySQL2** `^3.14.1` - MySQL driver for Node.js

### Authentication & Security
- **JSON Web Token** `^9.0.2` - Secure authentication
- **bcryptjs** `^3.0.2` - Password hashing
- **CORS** `^2.8.5` - Cross-origin resource sharing

### Documentation & Development
- **Swagger JSDoc** `^6.2.8` - API documentation
- **Swagger UI Express** `^5.0.1` - Interactive API documentation
- **@faker-js/faker** `^9.8.0` - Generate fake data for testing
- **dotenv** `^17.0.0` - Environment variable management

## 🗄️ Database Schema

### Core Entities
- **Users** - Authentication and user management
- **Students** - Student information and enrollment
- **Teachers** - Teacher profiles and course assignments  
- **Courses** - Course details and schedules

### Relationships
- User → Student/Teacher (One-to-One)
- Teacher → Courses (One-to-Many)
- Students ↔ Courses (Many-to-Many)

## � Authentication Flow

1. **Registration**: Create user account with encrypted password
2. **Login**: Authenticate with email/password, receive JWT token
3. **Authorization**: Include JWT token in Authorization header for protected routes
4. **Role-based Access**: Different permissions based on user roles

## 🚀 Deployment

### Production Environment Variables
```env
NODE_ENV=production
DB_HOST=your_production_db_host
DB_NAME=your_production_db_name
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_production_jwt_secret
```
## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- Sequelize team for the robust ORM
- Swagger team for excellent API documentation tools
- All contributors who helped improve this project

---

⭐ **Star this repository if it helped you!** ⭐
