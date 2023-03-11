const submitButton = document.getElementById("submit");
const formContainer = document.getElementById("main-form");
const form = document.getElementById("registration-form");

const errors = {
	isFirstNameError: true,
	isLastNameError: true,
	isEmailError: true,
	isPasswordError: true,
	isPassConfirmError: true,
};

const validateField = (item, validator, errorFieldName) => {
	item.addEventListener("input", (e) => {
		if (!validator(e.target.value)) {
			errors[errorFieldName] = true;
			item.closest(".form-field").setAttribute("aria-invalid", "true");
			return;
		}
		errors[errorFieldName] = false;
		item.closest(".form-field").setAttribute("aria-invalid", "false");
	});

	item.addEventListener("focus", (e) => {
		item.closest(".form-field").setAttribute("aria-invalid", "false");
	});
};

//firstName
const firstName = document.getElementById("first-name");
validateField(firstName, (str) => !!str, "isFirstNameError");

//lastName
const lastName = document.getElementById("last-name");
validateField(lastName, (str) => !!str, "isLastNameError");

//email
const email = document.getElementById("email");
const validateEmail = (email) => {
	return email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
validateField(email, validateEmail, "isEmailError");

//passwords
const password = document.getElementById("password");
const validatePassword = (pass) => {
	let isValid = true;
	const length = document.getElementById("pass-length");
	const upperCase = document.getElementById("pass-up");
	const lowerCase = document.getElementById("pass-low");
	const numbers = document.getElementById("pass-num");
	if (pass.length > 7) {
		length.classList.add("correct");
	} else {
		length.classList.remove("correct");
		isValid = false;
	}
	if (/[A-Z]/.test(pass)) {
		upperCase.classList.add("correct");
	} else {
		upperCase.classList.remove("correct");
		isValid = false;
	}
	if (/[a-z]/.test(pass)) {
		lowerCase.classList.add("correct");
	} else {
		lowerCase.classList.remove("correct");
		isValid = false;
	}
	if (/[0-9]/.test(pass)) {
		numbers.classList.add("correct");
	} else {
		numbers.classList.remove("correct");
		isValid = false;
	}
	return isValid;
};
validateField(password, validatePassword, "isPasswordError");

const passConfirm = document.getElementById("confirm-password");
const validatePassConfirm = () => {
	return passConfirm.value === password.value;
};
validateField(passConfirm, validatePassConfirm, "isPassConfirmError");
password.addEventListener("input", () => {
	passConfirm
		.closest(".form-field")
		.setAttribute("aria-invalid", validatePassConfirm() ? "false" : "true");
});

submitButton.addEventListener("click", (e) => {
	e.preventDefault();

	if (Object.values(errors).includes(true)) return;

	//all inputs good good
	const formData = new FormData(form);
	var object = {};
	formData.forEach(function (value, key) {
		object[key] = value;
	});
	console.log(object);
	formContainer.innerHTML = "";
	const clone = document
		.getElementById("done-template")
		.content.cloneNode(true);
	formContainer.appendChild(clone);
});
