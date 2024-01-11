const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const fs = require('fs');
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

app.get('/', (req, res) => {
    res.send(jsonData);
});

app.get('/names', (req, res) => {
    res.send(employeeNames);
});

app.get('/names-with-id', (req, res) => {
    res.send(employeeNameToID);
});

app.get('/salary', (req, res) => {
    let employeeID = req.query.id;

    res.send(employeeIDtoSalary[employeeID].toString());
});

app.get('/get-two-names-from-id', (req, res) => {
    let employeeID1 = req.query.empID1;
    let employeeID2 = req.query.empID2;

    let employeeName1 = jsonData[employeeID1].name;
    let employeeName2 = jsonData[employeeID2].name;

    res.send([employeeName1, employeeName2]);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
