module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customers.create);
    
    router.post("/addbill/:id", customers.addbill);
  
    // Retrieve all Customers
    router.get("/all", customers.findAll);
  
    // Retrieve a single Customer with id
    router.get("/:id", customers.findOne);
  
    // Update a Customer with id
    router.put("/:id", customers.update);
  
  
    app.use('/api/customers', router);
  };