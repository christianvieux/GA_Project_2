# Recipe CRUD App

## Description

This is a Recipe CRUD (Create, Read, Update, Delete) web application built as part of my software engineering bootcamp project submission. The app allows users to share their recipes by adding, viewing, editing, and deleting them.

## Project Status

This project is a work in progress. The **Create** route is currently missing, and I plan to revisit it in the future. At this stage, the app is functional for viewing, updating, and deleting recipes. However, I am submitting this version for the purpose of completing my bootcamp assignments and moving forward with the curriculum.

## Features

- **Create**: Users can add recipes (to be added in future updates).
- **Read**: View recipes shared by others.
- **Update**: Edit existing recipes.
- **Delete**: Remove recipes from the list.
- **Comment**: Authorized users can add comment on recipes.


## Technologies Used

- **HTML** & **CSS** (for basic page structure and styling)
- **Bootstrap** (for responsive components)
- **Node.js** (for backend functionality, if applicable)
- **Express.js** (if applicable for routing)
- **MongoDB** (if applicable for database)

## Future Improvements

- Implement the **Create** route functionality so users can add new recipes.
- Add user authentication to allow for personalized recipe management.
- Improve UI/UX for a more seamless experience.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/christianvieux/GA_Project_2.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npm start
   ```

4. Visit `http://localhost:3000` in your browser.

## .env Variables

Make sure to create a ```.env``` file in the root directory and set the following environment variables for the app to function correctly. Here is an example of what your ```.env``` file should look like:

```javascript
    NODE_ENV=development
    PORT=3000
    MONGODB_URI="mongodb+srv://<username>:<db_password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority"
    DATABASE=<your-database-name>
    PASSWORD=<your-secure-password>
    SESSION_SECRET="<your-session-secret>"
```

## Acknowledgements

- I've used **Bootstrap** for providing responsive UI components.
- This app was built as part of the Software Engineering Bootcamp.