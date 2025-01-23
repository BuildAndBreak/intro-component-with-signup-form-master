const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const tryParagraph = document.getElementById("try-it-paragraph");

form.addEventListener("submit", (e) => {
  //prevents the form from submitting in the default way
  e.preventDefault();
  if (checkInputs()) {
    form.requestSubmit();
  }
});

function checkInputs() {
  //get the values from the inputs
  //trim method is used to remove any spaces
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let formIsValid = true;

  if (firstNameValue === "") {
    setErrorFor(firstName, "First name cannot be empty!");
    formIsValid = false;
    clearSucess(firstName);
  } else {
    setSucessFor(firstName);
  }
  if (lastNameValue === "") {
    setErrorFor(lastName, "Last name cannot be empty!");
    formIsValid = false;
    clearSucess(lastName);
  } else {
    setSucessFor(lastName);
  }
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be empty!");
    formIsValid = false;
    clearSucess(email);
  } else if (!emailRegex.test(emailValue)) {
    setErrorFor(email, "Invalid email, ex: abc123@gmail.com");
    formIsValid = false;
    clearSucess(email);
  } else {
    setSucessFor(email);
  }
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be empty!");
    formIsValid = false;
    clearSucess(password);
  } else if (passwordValue.length < 6) {
    setErrorFor(password, "Password must have at least 6 characters!");
    formIsValid = false;
    clearSucess(password);
  } else if (!uppercaseRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one upper Case!");
    formIsValid = false;
    clearSucess(password);
  } else if (!symbolRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one symbol!");
    formIsValid = false;
    clearSucess(password);
  } else {
    setSucessFor(password);
  }
  return formIsValid;
}

function setErrorFor(input, message) {
  const inputControl = input.parentElement;
  let small = inputControl.querySelector("small");
  if (!small) {
    small = document.createElement("small");
    small.classList.add("message");
    inputControl.appendChild(small);
  }
  small.innerHTML = message;
  input.addEventListener("input", () => {
    clearError(input);
  });
}

function setSucessFor(input) {
  const inputControl = input.parentElement;
  let validImg = inputControl.querySelector("img");
  if (!validImg) {
    validImg = document.createElement("img");
    validImg.src = "/images/green-thumbs-up.png";
    validImg.classList.add("thumbs-up");
    inputControl.appendChild(validImg);
  }
}

function clearError(input) {
  const inputControl = input.parentElement;
  const small = inputControl.querySelector("small");
  if (small) {
    small.remove();
  }
}

function clearSucess(input) {
  const inputControl = input.parentElement;

  input.addEventListener("input", () => {
    const validImg = inputControl.querySelector("img");
    if (input.value.trim() === "" && validImg) {
      validImg.remove();
    }
  });
}
