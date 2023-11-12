const fs = require("fs").promises;
const path = require("path");

let sets = [];

const themeData = require("../data/themeData.json");
const setData = require("../data/setData.json");

function initialize() {
  return new Promise((resolve, reject) => {
    // Process the data and add themes
    sets = setData.map((set) => {
      const theme = themeData.find((theme) => theme.id === set.theme_id);
      return { ...set, theme: theme ? theme.name : "Unknown" };
    });

    resolve();
  });
}

function getAllSets() {
  return new Promise((resolve) => {
    resolve(sets);
  });
}

function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    const set = sets.find((s) => s.set_num === setNum);
    if (set) {
      resolve(set);
    } else {
      reject("Set not found");
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve) => {
    const themeLowerCase = theme.toLowerCase();
    const filteredSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(themeLowerCase),
    );
    resolve(filteredSets);
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
