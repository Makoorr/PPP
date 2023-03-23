require('dotenv').config()
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.PASSWORD,
    database: process.env.DB
  });

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

function createTables() {
  const createTableUserQuery = `CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL AUTO_INCREMENT,
    username varchar(50) DEFAULT NULL,
    password varchar(150) DEFAULT NULL,
    PRIMARY KEY (id))`;

  const createTableProjectQuery = `CREATE TABLE IF NOT EXISTS projects (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    description varchar(50) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_User FOREIGN KEY (id) REFERENCES user (id) ON DELETE NO ACTION ON UPDATE NO ACTION);`

  const createTableSectionQuery = `CREATE TABLE IF NOT EXISTS sections (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    description varchar(50) DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Project FOREIGN KEY (id) REFERENCES project (id) ON DELETE NO ACTION ON UPDATE NO ACTION);`

  const createTableTaskQuery = `CREATE TABLE IF NOT EXISTS tasks (
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(50) DEFAULT NULL,
    description varchar(50) DEFAULT NULL,
    priority int(11) DEFAULT NULL,
    deadline date DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_Section FOREIGN KEY (id) REFERENCES section (id) ON DELETE NO ACTION ON UPDATE NO ACTION)`;

    connection.query(createTableUserQuery, (err, result) => {
      if (err) {
      console.error('Error creating MySQL Users table: ', err);
      } else {
      console.log('MySQL User table created successfully!');
      }
  });
    connection.query(createTableProjectQuery, (err, result) => {
      if (err) {
      console.error('Error creating MySQL Projects table: ', err);
      } else {
      console.log('MySQL Project table created successfully!');
      }
  });
    connection.query(createTableSectionQuery, (err, result) => {
      if (err) {
      console.error('Error creating MySQL Sections table: ', err);
      } else {
      console.log('MySQL Section table created successfully!');
      }
  });
    connection.query(createTableTaskQuery, (err, result) => {
      if (err) {
      console.error('Error creating MySQL Tasks table: ', err);
      } else {
      console.log('MySQL Task table created successfully!');
      }
  });
}

module.exports = connection;