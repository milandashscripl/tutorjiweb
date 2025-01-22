// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//     event.preventDefault();
  
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
    
    
//     const response = await fetch('https://tutorji.onrender.com/api/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });
  
//     if (response.ok) {
//       const data = await response.json();
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('userId', data.userId);
//       window.location.href = 'profile.html';
//     } else {
//       alert('Invalid login credentials');
//     }
//   });
  

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value; // Capture selected role

  try {
    const response = await fetch('https://tutorji.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();

      // Save token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role); // Save role to localStorage

      // Redirect based on role
      if (role === 'admin' && data.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (role === 'user' && data.role === 'user') {
        window.location.href = 'profile.html';
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
