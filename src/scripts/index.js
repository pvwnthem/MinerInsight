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
  event.preventDefault();

  var form = event.target;
  var formData = {
    link: form.link.value // Assuming you have an input field with the name "link"
  };

  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type to JSON

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      console.log(response);
    } else {
      console.error('Request failed. Status: ' + xhr.status);
    }
  };

  xhr.send(JSON.stringify(formData)); // Convert the form data to JSON string
}


window.onload = main