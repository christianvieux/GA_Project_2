# Recipe CRUD App
## Description
This is a Recipe CRUD (Create, Read, Update, Delete) web application built as my **Project 2** submission for the **General Assembly** Software Engineering Immersive bootcamp. The app allows users to share their recipes by adding, viewing, editing, and deleting them. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this project demonstrates full-stack development skills and RESTful API implementation learned during the bootcamp.
## 🌐 Live App
Visit the live application [here.](http://54.165.74.209:3000/home)
## Features
- **User Authentication**: Register and login to manage your recipes
- **Create**: Add new recipes with title, description, ingredients, instructions, and images
- **Read**: Browse and search through recipes shared by the community
- **Update**: Edit your own recipes
- **Delete**: Remove your recipes from the collection
- **Comments**: Leave comments on recipes
- **Likes**: Show appreciation for recipes by liking them
- **Search & Filter**: Find recipes by title, description, or category
- **Responsive Design**: Works on both desktop and mobile devices
## Technologies Used
- **Frontend**: 
  - HTML, CSS, JavaScript
  - Bootstrap for responsive design
  - EJS for templating
- **Backend**: 
  - Node.js
  - Express.js for routing and middleware
  - MongoDB for database
  - Mongoose for ODM
- **Authentication**:
  - bcrypt for password hashing
  - express-session for session management
- **Other Tools**:
  - method-override for HTTP method override
  - express-validator for input validation
  - morgan for HTTP request logging
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/christianvieux/GA_Project_2_Recipe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and set up your environment variables:
   ```bash
   NODE_ENV=development
   PORT=3000
   MONGODB_URI="mongodb+srv://<username>:<db_password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority"
   DATABASE=<your-database-name>
   PASSWORD=<your-secure-password>
   SESSION_SECRET="<your-session-secret>"
   ```
4. Run the app:
   ```bash
   npm start
   ```
5. Visit `http://localhost:3000` in your browser. If it doesn't work check the console or the port 3000 might be already in use.
## Future Improvements
- Improve UI/UX more.
- Add more content.
