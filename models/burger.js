// Import of the ORM object in order to use the functions that will interact with the database
var orm = require("../config/orm.js");

// Creates our burger object
var burger = {
// function that selects all of the burger entries
    all: function(cb) {
      orm.all("burgers", function(res) {
        cb(res);
      });
    },
    // A function that will take vals(an array of values) that we will insert into cols(columns to store our values)
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      },

    //   a function that will take our objColVals object and update the columns and values
      update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      }
    };
    // export of the database functions to be used in our controller file
    module.exports = burger;
    
    