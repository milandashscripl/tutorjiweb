// 🚀------------------- LOGIN FORM HANDLER -------------------🚀
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page refresh on form submission

  // 🔑 Capture form input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;

  try {
    // 🌐 Send login request to backend
    const response = await fetch("https://tutorji.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Login failed. Please try again.");
      return;
    }

    const { token, user } = await response.json();

    // 🛡️ Validate backend response
    if (!user?.role) {
      throw new Error("Invalid response from server: Role not defined.");
    }

    if (user.role !== role) {
      alert("Role mismatch. Please select the correct role.");
      return;
    }

    // 💾 Save authentication details in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("role", user.role);

    // 🚪 Redirect based on user role
    const redirectMap = {
      admin: "admin-dashboard.html",
      user: "index.html",
    };

    window.location.href = redirectMap[role] || "index.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});
