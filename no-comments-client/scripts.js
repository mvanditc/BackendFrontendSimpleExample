let backendOutput = document.getElementById("backendOutput");
let endpointInput = document.getElementById("endpointInput");
let endpointSubmitButton = document.getElementById("endpointSubmitButton");

endpointSubmitButton.addEventListener("click", ()=>{

    fetch(endpointInput.value)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        return response.json();
    })
    .then(data => {
        console.log('Data from the backend:', data);
        backendOutput.innerHTML = JSON.stringify(data);
    })
    .catch(error => {
        console.error('Fetch error:', error.message);
    });
})
