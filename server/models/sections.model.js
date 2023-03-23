const connection = require("../db/database");

// constructor
const Section = function(Section) {
    this.name = Section.name;
    this.description = Section.description;
  };

  Section.create = (newSection, result) => {
    connection.query("INSERT INTO sections SET ?", newSection, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created Section: ", { id: res.insertId, ...newSection });
      result(null, { id: res.insertId, ...newSection });
    });
  };
  
  Section.findById = (id, result) => {
    connection.query(`SELECT * FROM sections WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Section: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Section with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  Section.getAll = (title, result) => {
    let query = "SELECT * FROM sections";
  
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
  
    connection.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Sections: ", res);
      result(null, res);
    });
  };
  
  Section.getAllPublished = result => {
    connection.query("SELECT * FROM sections WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Sections: ", res);
      result(null, res);
    });
  };
  
  Section.updateById = (id, Section, result) => {
    connection.query(
      "UPDATE sections SET title = ?, description = ?, published = ? WHERE id = ?",
      [Section.title, Section.description, Section.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Section with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated Section: ", { id: id, ...Section });
        result(null, { id: id, ...Section });
      }
    );
  };
  
  Section.remove = (id, result) => {
    connection.query("DELETE FROM sections WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Section with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted Section with id: ", id);
      result(null, res);
    });
  };
  
  Section.removeAll = result => {
    connection.query("DELETE FROM sections", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} sections`);
      result(null, res);
    });
  };
  
  module.exports = Section;