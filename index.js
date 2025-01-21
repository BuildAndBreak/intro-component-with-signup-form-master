const form = document.getElementById("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const tryParagraph = document.getElementById("try-it-paragraph");

form.addEventListener("submit", (e) => {
  e.preventDefault(); /*prevents the form from submitting in the default way*/
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
  let hasError = false;
  const uppercaseRegex = /[A-Z]/;
  const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (firstNameValue === "") {
    setErrorFor(firstName, "First name cannot be empty!");
    hasError = true;
  }
  if (lastNameValue === "") {
    setErrorFor(lastName, "Last name cannot be empty!");
    hasError = true;
  }
  if (emailValue === "") {
    setErrorFor(email, "Email cannot be empty!");
    hasError = true;
  }
  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be empty!");
    hasError = true;
  }

  if (
    !uppercaseRegex.test(passwordValue) &&
    !symbolRegex.test(passwordValue) &&
    passwordValue.length < 6
  ) {
    setErrorFor(
      password,
      "Password must have at least one upper Case, one symbol and 6 characters!"
    );
    hasError = true;
  } else if (passwordValue.length < 6) {
    setErrorFor(password, "Password must have at least 6 characters!");
    hasError = true;
  } else if (!uppercaseRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one upper Case!");
    hasError = true;
  } else if (!symbolRegex.test(passwordValue)) {
    setErrorFor(password, "Password must have at least one symbol!");
    hasError = true;
  }
  if (hasError) return;
}

function setErrorFor(input, message) {
  const inputControl = input.parentElement;
  const small = document.createElement("small");
  small.classList.add("message");
  inputControl.appendChild(small);

  small.innerHTML = message;

  input.addEventListener("input", () => {
    clearError(input);
  });
}

function clearError(input) {
  const inputControl = input.closest(".input-control");
  const small = inputControl.querySelector("small");
  small.innerHTML = "";
}
