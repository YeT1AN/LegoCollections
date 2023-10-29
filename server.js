/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Ye Tian    Student ID: 142003227   Date: Sept 28, 2023
*
********************************************************************************/

const express = require('express');
const app = express();
const legoData = require('./modules/legoSets');
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Ensure the legoData is initialized before starting the server
legoData.initialize()
  .then(() => {
    // Routes
    app.get('/', (req, res) => {
      // Send the home.html file
      res.sendFile(path.join(__dirname, 'views', 'home.html'));
    });

    app.get('/about', (req, res) => {
      // Send the about.html file
      res.sendFile(path.join(__dirname, 'views', 'about.html'));
    });

    app.get('/lego/sets', (req, res) => {
      // Check if there is a "theme" query parameter
      const theme = req.query.theme;
      
      // Use the appropriate legoData function based on the presence of the theme parameter
      const legoDataFunction = theme
        ? legoData.getSetsByTheme(theme)
        : legoData.getAllSets();

      legoDataFunction
        .then((sets) => {
          res.json(sets);
        })
        .catch((error) => {
          res.status(404).json({ error: 'Internal Server Error' });
        });
    });

    app.get('/lego/sets/:setNum', (req, res) => {
      const setNum = req.params.setNum;
      legoData.getSetByNum(setNum)
        .then((set) => {
          if (set) {
            res.json(set);
          } else {
            res.status(404).json({ error: 'Set not found' });
          }
        })
        .catch((error) => {
          res.status(404).json({ error: 'Internal Server Error' });
        });
    });

    // Custom 404 Page
    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    });

    // Start the server
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing legoData:', error);
  });