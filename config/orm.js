// import the MySQL connection
var connection = require("./connection.js");

// Function to pass 3 values into the SQL query, SQL requires question marks so that's why it loops and prints 3 question marks to later be converted into strings
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// A function that converts object values and keys to SQL syntax
function objToSql(ob) {
    var arr = [];

    // For loop that will loop through keys and push the values/keys as string into the array
    for (var key in ob) {
      arr.push(key + "=" + value);
        }
// translate array to a single string
    return arr.toString();
}

// ORM object for SQL functions
var orm = {
    all: function(table, cb) {
        var queryString = "SELECT * FROM " + table;
        
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Function to insert values into the columns of the database table
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // Function to update columns and values
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

// Export of the ORM object
module.exports = orm;