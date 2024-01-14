let backendOutput = document.getElementById("backendOutput");
let endpointInput = document.getElementById("endpointInput");
let endpointSubmitButton = document.getElementById("endpointSubmitButton");

let endpointWithJSONSubmitButton = document.getElementById("endpointWithJSONSubmitButton");

endpointSubmitButton.addEventListener("click", ()=>{

    fetch(endpointInput.value)
    .then(response => {
        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        // Parse the JSON from the response
        return response.json();
    })
    .then(data => {
        // Process the retrieved data
        console.log('Data from the backend:', data);
        backendOutput.innerHTML = JSON.stringify(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Fetch error:', error.message);
    });
})

// When the "Update Stored JSON Submit" button is clicked, this function will run.
//The function will send a PUT request to the Backend with a JSON body including information
//that the Backend uses to update data stored in the Backend.
//The information that is sent is the time and date of when the button was clicked.
endpointWithJSONSubmitButton.addEventListener("click", ()=>{

    //Get current date and time.
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    fetch("http://localhost:3000/update-stored-json", {
        method: 'PUT', // Specify that this is a PUT request.
        headers: {
          'Content-Type': 'application/json' // Header that indicates that the body of the request contains JSON data.
        },
        body: JSON.stringify({"time": dateTime}) // The contents of the body.
    })
    .then(response => {
        // Check if the response status is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        // Parse the JSON from the response
        return response.json();
    })
    .then(data => {
        // Process the retrieved data
        console.log('Data from the backend:', data);
        backendOutput.innerHTML = JSON.stringify(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Fetch error:', error.message);
    });
})