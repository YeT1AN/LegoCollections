require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

// Define a "Theme" model
const Theme = sequelize.define(
  'Theme',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // use "project_id" as a primary key
        autoIncrement: true, // automatically increment the value
    },
    name: {
        type: Sequelize.STRING
    },
},
  {
    createdAt: false, // disable createdAt
    updatedAt: false, // disable updatedAt
  }
);
// Define a "Set" model
const Set = sequelize.define(
  'Set',
  {
    set_num: {
      type: Sequelize.STRING,
      primaryKey: true, 
    },
    name: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    },
    theme_id: {
        type: Sequelize.INTEGER
    },
    num_parts: {
        type: Sequelize.INTEGER
    },
    img_url: {
        type: Sequelize.STRING
    },
},
    {
    createdAt: false,
    updatedAt: false,
    }
);
Set.belongsTo(Theme, {foreignKey: 'theme_id'});

const fs = require("fs").promises;
const path = require("path");

function initialize() {
  return sequelize.sync().catch((err) => {
    throw err;
  });
}

function getAllSets() {
  return Set.findAll({ include: [Theme] });
}

function getSetByNum(setNum) {
  return Set.findAll({
    include: [Theme],
    where: { set_num: setNum },
  }).then((sets) => {
    if (sets.length > 0) return sets[0];
    else throw new Error('Unable to find requested set');
  });
}

function getSetsByTheme(theme) {
  return Set.findAll({
    include: [Theme],
    where: {
      '$Theme.name$': {
        [Sequelize.Op.iLike]: `%${theme}%`,
      },
    },
  }).then((sets) => {
    if (sets.length > 0) return sets;
    else throw new Error('Unable to find requested sets');
  });
}

// Add a new set
function addSet(setData) {
  return Set.create(setData).catch((err) => {
    throw new Error(err.errors[0].message);
  });
}
//Add the editSet
function editSet(set_num, setData) {
  return new Promise((resolve, reject) => {
    Set.update(setData, { where: { set_num } })
      .then(() => resolve())
      .catch((err) => reject(err.errors[0].message));
  });
}
// Delete a set
function deleteSet(setNum) {
  return new Promise((resolve, reject) => {
      Set.destroy({ where: { set_num: setNum } })
          .then(() => resolve())
          .catch(err => reject(err.errors[0].message));
  });
}
// Get all themes
function getAllThemes() {
  return Theme.findAll();
}

module.exports = {
  initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
  addSet,
  editSet,
  deleteSet,
  getAllThemes
};