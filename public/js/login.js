// Define the signupHandler function first
const signupHandler = (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    console.log('Signup successful');
    alert(`Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  } else {
    alert('Please enter valid info');
  }
}


// Define the loginHandler function if it's not defined elsewhere
function loginHandler(event) {
  event.preventDefault();

  // Capture login form values here
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Process the login form data as needed
  if (email && password) {
    console.log('Login successful');
    alert(`Email: ${email}\nPassword: ${password}`);
  } else {
    alert('Please enter valid login information');
  }
}

// Now, add event listeners to the forms
document.querySelector('.login-form').addEventListener('submit', loginHandler);
document.querySelector('.signup-form').addEventListener('submit', signupHandler);
