
const signupHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name,  email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('success');
      document.location.replace('/');
    } else {
      alert('Failed to signup');
      // alert(response.statusText);
    }
  }
};



const loginHandler = async (event) => {
  event.preventDefault();

  // Capture login form values here
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Process the login form data as needed
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      alert('success');
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

  // Now, add event listeners to the forms
  document.querySelector('.login-form').addEventListener('submit', loginHandler);
  document.querySelector('.signup-form').addEventListener('submit', signupHandler);
