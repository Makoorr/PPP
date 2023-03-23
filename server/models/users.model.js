const connection = require("../db/database");

// constructor
const User = function(User) {
    this.name = User.name;
    this.password = User.password;
  };
  
  User.create = (newUser, result) => {
    connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
  
  User.findById = (id, result) => {
    connection.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.getAll = (name, result) => {
    let query = "SELECT * FROM users";
  
    if (name) {
      query += ` WHERE name LIKE '%${name}%'`;
    }

    connection.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Users: ", res);
      result(null, res);
    });
  };

  User.updateById = (id, User, result) => {
    connection.query("UPDATE users SET name = ?, password = ? WHERE id = ?",
      [User.title, User.description, User.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated User: ", { id: id, ...User });
        result(null, { id: id, ...User });
      }
    );
  };
  
  User.remove = (id, result) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted User with id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    connection.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;