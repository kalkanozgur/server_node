const db = require("../models");
const Customer = db.customers;

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Name can not be empty!" });
      return;
    }
  
    // Create a Customer
    const customer = new Customer({
      name: req.body.name,
      vkn: req.body.vkn,
      phone: req.body.phone,
    //   description: req.body.description,
    //   published: req.body.published ? req.body.published : false
    });
  
    // Save Customer in the database
    customer
      .save(customer)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  console.log("findedall");
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Customer.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Customer.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Customer with id " + id , data: data});
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Customer with id=" + id , err: err});
      });
};

exports.addbill = (req, res) => {
    const id = req.params.id;
    Customer.findByIdAndUpdate(
        id, 
        { $push: { bill: { amount: req.body.amount } },
    },
    { new: true, useFindAndModify:false}
    ).then(data => {
        if(!data) {
            req.status(404).send({
                message: `Cannot update Customers bill with id=${id}. Maybe Customer was not found!`,
                data: data
            });
        } else res.send({ message: "Customers bill was updated successfully"});
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Customer with id=" + id,
            err: err
        });
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Customer.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found!`
          });
        } else res.send({ message: "Customer was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Customer with id=" + id
        });
      });
};
