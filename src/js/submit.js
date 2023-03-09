const submitButton = document.getElementById("submit");
const formContainer = document.getElementById("main-form");

submitButton.addEventListener("click", (e) => {
	e.preventDefault();
	formContainer.innerHTML = "";
    const clone = document.getElementById("done-template").content.cloneNode(true);
    formContainer.appendChild(clone)
});

console.log(submit);
