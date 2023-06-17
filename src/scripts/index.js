function main() {
    const modal = document.querySelector("#modal")
    const closeModal = document.querySelector("#close-button");
    const openModal = document.querySelector("#open-button");


    openModal.addEventListener("click", () => {
        modal.showModal();
    });


    closeModal.addEventListener("click", () => {
        modal.close();
    });

    var form = document.getElementById('addform');

    // Add a submit event listener to the form
    form.addEventListener('submit', handleFormSubmission);
    
}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the form element
    var form = event.target;

    // Get the form data
    var formData = new FormData(form);

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open(form.method, form.action, true);

    // Set the callback function when the request completes
    xhr.onload = function() {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        // Handle the response here
        console.log(response);
      } else {
        // Handle the error case
        console.error('Request failed. Status: ' + xhr.status);
      }
    };

    // Send the request
    xhr.send(formData);

}

window.onload = main