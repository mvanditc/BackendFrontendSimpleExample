let backendOutput = document.getElementById("backendOutput");
let endpointInput = document.getElementById("endpointInput");
let endpointSubmitButton = document.getElementById("endpointSubmitButton");

let endpointWithJSONSubmitButton = document.getElementById("endpointWithJSONSubmitButton");

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

endpointWithJSONSubmitButton.addEventListener("click", ()=>{

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    fetch("http://localhost:3000/update-stored-json", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"time": dateTime})
    })
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