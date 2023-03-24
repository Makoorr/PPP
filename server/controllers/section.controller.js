const Section = require("../models/sections.model.js");

// Create and Save a new Section
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Section
  const Section = new Section({
    name: req.body.name,
    description: req.body.description
  });

  // Save Section in the database
  Section.create(section, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Section."
      });
    else res.send(data);
  });
};

// Retrieve all Sections from the database (with condition).
exports.findAll = (req, res) => {
    const name = req.query.name;

    Section.getAll(name, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Sections."
        });
      else res.send(data);
    });
};

// Find a single Section with a id
exports.findOne = (req, res) => {
    Section.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `Not found Section with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error retrieving Section with id " + req.params.id
            });
            }
        } else res.send(data);
        });
};

// Update a Section identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Section.updateById(
    req.params.id,
    new Section(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Error updating Section with the id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Section with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Section with the specified id in the request
exports.delete = (req, res) => {
    Section.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Section with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Section with id " + req.params.id
            });
          }
        } else res.send({ message: `Section was deleted successfully!` });
      });
};

// Delete all Sections from the database.
exports.deleteAll = (req, res) => {
  Section.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sections."
      });
    else res.send({ message: `All Sections were deleted successfully!` });
  });
};