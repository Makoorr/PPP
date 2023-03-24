const connection = require("../db/database");

// constructor
const Task = function(Task) {
    this.name = Task.name;
    this.description = Task.description;
    this.priority = Task.priority;
    this.deadline = Task.deadline;
  };

  Task.create = (newTask, result) => {
    connection.query("INSERT INTO tasks SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Task: ", { id: res.insertId, ...newTask });
      result(null, { id: res.insertId, ...newTask });
    });
  };
  
  Task.findById = (id, result) => {
    connection.query(`SELECT * FROM tasks WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Task: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Task with the id
      result({ kind: "not_found" }, null);
    });
  };

  Task.getAll = (name, result) => {
    let query = "SELECT * FROM tasks";
  
    if (name) {
      query += ` WHERE name LIKE '%${name}%'`;
    }

    connection.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Tasks: ", res);
      result(null, res);
    });
  };

  Task.updateById = (id, Task, result) => {
    if (Task.name || Task.description || Task.priority || Task.deadline){
      query = "UPDATE tasks SET";
        if (Task.name)
          query += " name = ?"
        if (Task.description)
          query += ", description = ?"
        if (Task.priority)
          query += " priority = ?"
        if (Task.deadline)
          query += ", deadline = ?"
      query += " WHERE id = ?";
    }
    connection.query(query,
      [Task.name, Task.description, Task.priority, Task.deadline, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Task with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Task: ", { id: id, ...Task });
        result(null, { id: id, ...Task });
      }
    );
  };
  
  Task.remove = (id, result) => {
    connection.query("DELETE FROM tasks WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Task with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Task with id: ", id);
      result(null, res);
    });
  };
  
  Task.removeAll = result => {
    connection.query("DELETE FROM tasks", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Tasks`);
      result(null, res);
    });
  };
  
  module.exports = Task;