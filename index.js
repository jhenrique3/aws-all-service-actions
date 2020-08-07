// Loading express
const express = require("express");
const app = express();

// Load the SDK for JavaScript
const AWS = require('aws-sdk');

// variables
const SERVERPORT = 3000;

// Get all AWS services names from SDK
const allServices = Object.keys(AWS.apiLoader.services);

app.get("/services", (req, res) => {
    let services = '';
    allServices.forEach((item) => {
        services = services + item + '\n';
    })
    res.status(200).send(services);
})

app.get("/services/:service", (req, res) => {
    // Verify if service exists
    const service = allServices.find(s => s === req.params.service);
    if (!service)
        { res.status(404).send('Invalid service name')
    } else {

    // Get service last configuration version
        const serviceConfigVersions = Object.keys(AWS.apiLoader.services[service])
        const serviceConfigLastVersion = serviceConfigVersions[serviceConfigVersions.length-1]
    
        // Generate a list of service actions
        let actions = '';
        Object.keys(AWS.apiLoader.services[service][serviceConfigLastVersion].operations).forEach((item) => {
            actions = actions + item + '\n';
        });

        // Return all service actions
        // res.status(200).send(Object.keys(AWS.apiLoader.services[service][serviceConfigLastVersion].operations));
        res.status(200).send(actions);
    }
})


app.listen(SERVERPORT, () => {
    console.log(`Server started on port ${SERVERPORT}`)
})