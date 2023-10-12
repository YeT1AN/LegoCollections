const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id);
        return { ...set, theme: theme.name };
        });
        resolve();
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        resolve(sets);
    });
}

function getSetsByNum(setNum) {
    return new Promise((resolve, reject) => {
        const set = sets.find((set) => set.set_num === setNum);
        if (set) {
        resolve(set);
        } else {
        reject("Unable to find requested set");
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        const filteredSets = sets.filter((set) =>
        set.theme.toLowerCase().includes(theme.toLowerCase())
        );
        if (filteredSets.length > 0) {
        resolve(filteredSets);
        } else {
        reject("Unable to find requested sets");
        }
    });
}

module.exports = {
    initialize,
    getAllSets,
    getSetsByNum,
    getSetsByTheme,
};