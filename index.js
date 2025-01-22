const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const tryParagraph = document.getElementById("try-it-paragraph");

form.addEventListener("submit", (e) => {
  e.preventDefault(); /*prevents the form from submitting in the default way*/
  console.log(e);
  checkInputs();
});

tryParagraph.addEventListener("click", () => {
  document.getElementById("submit").focus();
});

function checkInputs() {
  //get the values from the inputs
  const firstNameValue =
    firstName.value.trim(); /* trim method is used to remove any spaces*/
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (firstNameValue === "") {
    setErrorFor(firstName, "First name cannot be empty!");
  }
  if (lastNameValue === "") {
    setErrorFor(lastName, "Last name cannot be empty!");
  }
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be empty!");
  }
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be empty!");
  } else if (passwordValue.length < 6) {
    setErrorFor(password, "Password must have at least 6 characters!");
  } else if (!uppercaseRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one upper Case!");
  } else if (!symbolRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one symbol!");
  }
}

function setErrorFor(input, message) {
  const inputControl = input.parentElement;
  console.log(inputControl);
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

function clearError(input) {
  const inputControl = input.parentElement;
  console.log(inputControl);
  const small = inputControl.querySelector("small");
  if (small) {
    small.remove();
  }
}
