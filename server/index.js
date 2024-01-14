// This is the file responsible for starting the Backend, as well as handling any requests made to the Backend.

// To start this Backend, open terminal and navigate to the "server" folder and enter the command "node index.js" to start the Backend.


// --------------------------------------------------------------------------------------

// Reference to the installed ExpressJS package, this allows you to use the features provided by ExpressJS.
const express = require('express');

// We will now initalize the ExpressJS application using this command. We 
//can refer to the initalized ExpressJS application using the "app" variable.
//the ExpressJS application is the Backend itself, the Backend is an ExpressJS application.
const app = express();
const port = 3000; //This is the port we will be running the Backend on.

// Body parser is a middleware that ExpressJS uses to process JSON bodies stored in requests made to the Backend.
const bodyParser = require('body-parser');

// Enable CORS for all routes (THIS IS VERY UNSECURE)
// The code in app.use is basically defining the access permissions of the Backend.
// By using these headers, we enable something called Cross-Origin Resource Sharing,
// This means that even though both the Frontend and the Backend both are being hosted on localhost,
// The Frontend can request from the Backend (THIS CODE ENABLES IT).
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allows * (anyone) to request from the Backend. Since the application is on localhost, request can only be made from the same machine.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allows GET, POST, PUT, DELETE requests
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Declare that the app will use the bodyParser for JSON request bodies
app.use(bodyParser.json());

// --------------------------------------------------------------------------------------
// Example Data
const fs = require('fs'); // File System package, used to read files.

const rawData = fs.readFileSync('employees.json');
const jsonData = JSON.parse(rawData);

const employeeNames = Object.values(jsonData).map(employee => employee.name);

let employeeNameToID = {};
Object.keys(jsonData).forEach(key => {
    employeeNameToID[key] = jsonData[key].name;
});

let employeeIDtoSalary = {};
Object.keys(jsonData).forEach(key => {
    employeeIDtoSalary[key] = jsonData[key].hourlyRate;
});

let storedJSON = {"details": "none"}

// --------------------------------------------------------------------------------------
// This code is used to define Endpoints we can use to obtain data from the Backend.

// Endpoint Usage Example:
// http://localhost:3000/
app.get('/', (req, res) => {
    res.send(jsonData);
});

// Endpoint Usage Example:
// http://localhost:3000/names
app.get('/names', (req, res) => {
    res.send(employeeNames);
});

// Endpoint Usage Example:
// http://localhost:3000/names-with-id
app.get('/names-with-id', (req, res) => {
    res.send(employeeNameToID);
});

// Endpoint Usage Example:
// http://localhost:3000/salary?id=2
app.get('/salary', (req, res) => {
    let employeeID = req.query.id;

    res.send(employeeIDtoSalary[employeeID].toString());
});

// Endpoint Usage Example:
// http://localhost:3000/get-two-names-from-id?empID1=0&empID2=1
app.get('/get-two-names-from-id', (req, res) => {
    let employeeID1 = req.query.empID1;
    let employeeID2 = req.query.empID2;

    let employeeName1 = jsonData[employeeID1].name;
    let employeeName2 = jsonData[employeeID2].name;

    res.send([employeeName1, employeeName2]);
});

// This endpoint handler is different from the rest because it handles a PUT request, instead of a GET request.
//PUT requests are generally used when creating a new resource or replacing a resource. In this case, we are replacing
//the data in the storedJSON variable with information given through the JSON stored in the PUT request's body.

//Other request types include GET, POST, and DELETE, I recommend reading about them.
app.put('/update-stored-json', (req, res) => {
    const requestData = req.body;

    storedJSON["details"] = "last update at " + requestData["time"]
  
    res.json(
            { 
                "message": 'Data updated successfully', 
                "newData": storedJSON
            }
        );
});

// Endpoint Usage Example:
// http://localhost:3000/get-stored-json
app.get('/get-stored-json', (req, res) => {

    res.send(storedJSON);
});


// --------------------------------------------------------------------------------------
// This code is used to open up the port to listen for any incoming requests.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
