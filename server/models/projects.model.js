const connection = require("../db/database");

// constructor
const Project = function(Project) {
    this.name = Project.name;
    this.description = Project.description;
  };

  Project.create = (newProject, result) => {
    connection.query("INSERT INTO projects SET ?", newProject, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
    });
  };
  
  Project.findById = (id, result) => {
    connection.query(`SELECT * FROM projects WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Project: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Project with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Project.getAll = (title, result) => {
    let query = "SELECT * FROM projects";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
    connection.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Projects: ", res);
      result(null, res);
    });
  };
  
  Project.getAllPublished = result => {
    connection.query("SELECT * FROM projects WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Projects: ", res);
      result(null, res);
    });
  };
  
  Project.updateById = (id, Project, result) => {
    connection.query(
      "UPDATE projects SET title = ?, description = ?, published = ? WHERE id = ?",
      [Project.title, Project.description, Project.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Project with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Project: ", { id: id, ...Project });
        result(null, { id: id, ...Project });
      }
    );
  };
  
  Project.remove = (id, result) => {
    connection.query("DELETE FROM projects WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Project with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Project with id: ", id);
      result(null, res);
    });
  };
  
  Project.removeAll = result => {
    connection.query("DELETE FROM projects", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} projects`);
      result(null, res);
    });
  };
  
  module.exports = Project;