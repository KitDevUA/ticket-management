# Ticket Management System

Welcome to the __Ticket Management System__. Below you will find the instructions to get the project up and running on your local development environment.

## Links
- [Demo](https://kitdev-ticket-management.vercel.app/)
- [API Documentation](https://kitdev-ticket-management.up.railway.app/api/docs)

## Technologies Used
- **DevOps**: Docker, Railway, Vercel, CI/CD, GitHub Actions, Health checks
- **Backend**: Node.js, Nest.js, TypeScript, Sequelize, PostgreSQL, Swagger
- **Frontend**: Vue3, TypeScript, Pinia, Axios

## Prerequisites

Before you begin, make sure you have Docker installed on your machine. Also, you should have Node.js and npm installed to handle various scripts that manage the application lifecycle.

## Initial Project Launch:

Follow these steps to set up the project initially:

1. **Environment Setup**
    - Copy the `.env.example` files and rename it to `.env`.
    - Modify `.env` files according to your local development environment needs.

2. **Installing all dependencies:**
   ```
   npm i
   ```

3. **Start the Backend**
   ```
   npm run local
   ```

4. **Start the Frontend**
   ```
    npm run dev
    ```

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Documentation: http://localhost:4000/api/docs

## Additional Information
- Make sure to check the `.env` for any environment-specific settings that are crucial for the operation of the API.

## 🔍 Code Quality
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Git hooks for pre-commit checks
- Component-based architecture
- Clean code principles

## ⚡ Performance
- Lazy loading of routes
- Debounced API calls
- Optimized bundle size
- Docker containerization

# Note
**This project was developed as a technical assessment, completed within one day. It demonstrates the ability to:**
- Quickly set up a full-stack application
- Implement modern development practices
- Write clean, maintainable code
- Use current industry-standard technologies
- Create responsive and user-friendly interfaces
- While the implementation is comprehensive for a one-day project, there's always room for additional features and improvements in a production environment.

# License
This project is licensed under the MIT License.

Created with ❤️ as a technical assessment