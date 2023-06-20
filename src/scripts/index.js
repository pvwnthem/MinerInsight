function main() {
  const modal = document.querySelector("#modal");
  const closeModal = document.querySelector("#close-button");
  const openModal = document.querySelector("#open-button");

  openModal.addEventListener("click", () => {
    modal.showModal();
  });

  closeModal.addEventListener("click", () => {
    modal.close();
  });

  var form = document.getElementById('addform');
  form.addEventListener('submit', handleFormSubmission);

  // Create a container element to hold the data
  const dataContainer = document.createElement("div");
  dataContainer.classList.add("data-container");
  document.body.appendChild(dataContainer);

  // Store the data container as a global variable
  window.dataContainer = dataContainer;
}

function render(data) {
  data = JSON.parse(data);

  // Clear the previous content in the data container
  window.dataContainer.innerHTML = "";

  if (data.version) {
    const versionElement = document.createElement("p");
    versionElement.textContent = `Version: ${data.version}`;
    versionElement.classList.add("version");
    window.dataContainer.appendChild(versionElement);
  }

  const softwareElement = document.createElement("p");
  softwareElement.textContent = `Software: ${data.software}`;
  softwareElement.classList.add("software");
  window.dataContainer.appendChild(softwareElement);

  const workersElement = document.createElement("ul");
  workersElement.classList.add("workers-list");

  data.workers.forEach(worker => {
    const workerElement = document.createElement("li");
    workerElement.textContent = `Worker ID: ${worker.id}, Name: ${worker.name}`;
    workerElement.classList.add("worker");
    workersElement.appendChild(workerElement);
  });

  window.dataContainer.appendChild(workersElement);

  const algorithmsElement = document.createElement("ul");
  algorithmsElement.classList.add("algorithms-list");

  data.algorithms.forEach(algorithm => {
    const algorithmElement = document.createElement("li");

    const hashrateElement = document.createElement("p");
    hashrateElement.textContent = `Hashrate: ${algorithm.hashrate}`;
    algorithmElement.appendChild(hashrateElement);

    const algorithmInfoElement = document.createElement("p");
    algorithmInfoElement.textContent = `Algorithm: ${algorithm.algorithm}`;
    algorithmElement.appendChild(algorithmInfoElement);

    const userElement = document.createElement("p");
    userElement.textContent = `User: ${algorithm.user}`;
    algorithmElement.appendChild(userElement);

    const poolElement = document.createElement("p");
    poolElement.textContent = `Pool: ${algorithm.pool}`;
    algorithmElement.appendChild(poolElement);

    algorithmElement.classList.add("algorithm");
    algorithmsElement.appendChild(algorithmElement);
  });

  window.dataContainer.appendChild(algorithmsElement);
}

// Rest of the code remains the same


function handleFormSubmission(event) {
  event.preventDefault();
  var form = event.target;
  var formData = {
    link: form.link.value
  };

  var xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = xhr.responseText;
      render(response);
      fetchWorkerData(form.link.value);
    } else {
      console.error('Request failed. Status: ' + xhr.status);
    }
  };

  xhr.send(JSON.stringify(formData));
}

function fetchWorkerData(link) {
  var formData = {
    link: link
  };
  setInterval(() => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/miners/add", true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        render(response);
      } else {
        console.error('Request failed. Status: ' + xhr.status);
      }
    };

    xhr.send(JSON.stringify(formData));
  }, 1000);
}

window.onload = main;
