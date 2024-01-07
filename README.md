# Git Repository - Lego Set Manager

## Overview
This Git repository contains the source code for a web application built with Node.js and Express, designed to manage and display information about Lego sets. The main functionalities include user registration, authentication, and the ability to add, edit, and delete Lego sets.

## Technologies Used
- **Node.js:** The backend server is built using Node.js.
- **Express:** The web application framework used for handling routes and requests.
- **Tailwind CSS:** A utility-first CSS framework utilized for styling the frontend components.
- **Client-Sessions:** Middleware used for session management.
- **EJS:** The templating engine employed for rendering dynamic content on the server-side.

## Features
1. **User Authentication:**
   - Users can register with the system.
   - Registered users can log in with their credentials.
   - Sessions are managed to keep users authenticated.

2. **Lego Set Management:**
   - Display a list of Lego sets based on selected themes.
   - Add new Lego sets to the database.
   - Edit existing Lego sets.
   - Delete Lego sets from the database.

3. **Random Quote Integration:**
   - Fetches a random quote from "quotable.io" and displays it alongside Lego set details.

4. **User History:**
   - Users can view their login history after successful authentication.

## How to Run
1. Clone the repository: `git clone [repository_url]`
2. Install dependencies: `npm install`
3. Set environment variables, including `PORT` and `SESSION_SECRET`.
4. Run the application: `npm start`

## Project Structure
- `public/`: Contains static assets such as stylesheets and client-side JavaScript.
- `views/`: EJS templates for rendering HTML pages.
- `modules/`: Includes modules for Lego set data and user authentication services.
- `app.js`: Entry point for the Node.js application.

## Usage
1. Visit the home page at `/` to explore Lego sets and navigate through the application.
2. Register or log in to access additional features such as adding, editing, and deleting Lego sets.
3. Explore the "About" page at `/about` for more information about the application.
