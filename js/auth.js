document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value; // Capture selected role
  const roleName = document.getElementById('roleName');
  roleName.innerText = role;
  console.log(role)
  try {
    const response = await fetch('https://tutorji.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      if (!data.role) {
        throw new Error('Role not defined in the response.');
      }

      // Save token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role); // Save role to localStorage

      // Validate role and redirect
      if (role === data.role) {
        if (role === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else if (role === 'user') {
          window.location.href = 'profile.html';
        }
      } else {
        alert('Role mismatch. Please check your credentials.');
      }
    } else {
      alert('Invalid login credentials');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred. Please try again later.');
  }
});
