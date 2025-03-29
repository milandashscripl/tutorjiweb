// 🚀------------------- LOGIN FORM HANDLER -------------------🚀
document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page refresh on form submission

  // 🔑 Capture form input values
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    // 🌐 Send login request to backend
    const response = await fetch("https://tutorji.onrender.com/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "❌ Login failed. Please try again.");
      return;
    }

    // ✅ Extract token & user details from response
    const { token, user, userId } = await response.json();

    // 💾 Save authentication details in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("user", JSON.stringify(user));

    // 🚀 Redirect to user dashboard after login
    window.location.href = "index.html"; 

  } catch (error) {
    console.error("Login error:", error);
    alert("🚫 An error occurred during login. Please try again.");
  }
});
