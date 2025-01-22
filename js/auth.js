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
  

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent form submission refresh

  // Capture input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    // Send login request to the backend
    const response = await fetch("https://tutorji.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle backend response
    if (response.ok) {
      const data = await response.json();

      // Ensure role exists in the response
      if (!data.user || !data.user.role) {
        throw new Error("Invalid response from server: Role not defined.");
      }

      // Validate user role
      if (data.user.role !== role) {
        alert("Role mismatch. Please select the correct role.");
        return;
      }

      // Save authentication details in localStorage
      localStorage.setItem("token", data.token); // Save the token
      localStorage.setItem("userId", data.user.id); // Save the user ID
      localStorage.setItem("role", data.user.role); // Save the role

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "admin-dashboard.html"; // Admin dashboard page
      } else if (role === "user") {
        window.location.href = "profile.html"; // User profile page
      }
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});
