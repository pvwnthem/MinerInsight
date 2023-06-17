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
}

window.onload = main