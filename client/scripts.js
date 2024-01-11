let backendOutput = document.getElementById("backendOutput");
let endpointInput = document.getElementById("endpointInput");
let endpointSubmitButton = document.getElementById("endpointSubmitButton");

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
