document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // const email = document.getElementById('email').value.trim();
    // const password = document.getElementById('password').value.trim();
    
    
    const response = await fetch('https://tutorji.onrender.com/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      window.location.href = 'profile.html';
    } else {
      alert('Invalid login credentials');
    }
  });
  


// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const email = document.getElementById('email').value.trim();
//   const password = document.getElementById('password').value.trim();

//   try {
//     const response = await fetch('https://tutorji.onrender.com/api/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const data = await response.json();
      
//       // Store token and user data in localStorage
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user)); // Store user as JSON string

//       // Redirect to profile page
//       window.location.href = 'profile.html';
//     } else {
//       const errorData = await response.json();
//       alert(errorData.message || 'Login failed. Please try again.');
//     }
//   } catch (error) {
//     console.error('Login Error:', error);
//     alert('An error occurred while logging in. Please check your connection or try again.');
//   }
// });





// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const email = document.getElementById('email').value.trim();
//   const password = document.getElementById('password').value.trim();

//   try {
//       const response = await fetch('https://tutorji.onrender.com/api/users/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//           const data = await response.json();
//           const { token, user } = data;

//           // Save token and user data in localStorage
//           localStorage.setItem('token', token);
//           localStorage.setItem('user', JSON.stringify(user));

//           // Redirect to profile page
//           window.location.href = 'profile.html';
//       } else {
//           const errorData = await response.json();
//           alert(errorData.message || 'Login failed. Please try again.');
//       }
//   } catch (error) {
//       console.error('Login Error:', error);
//       alert('An error occurred while logging in. Please check your connection or try again.');
//   }
// });




document.getElementById('logoutBtn').addEventListener('click', () => {
  console.log("Logging out....")
  localStorage.clear();
  window.location.href = 'login.html'; // Redirect to login page
});
