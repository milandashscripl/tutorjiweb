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
      alert(errorData.error || "Login failed. Please try again.");
      return;
    }

    const { token, user } = await response.json();

    // 🛡️ Validate backend response
    if (!user?.position) {
      throw new Error("Invalid response from server: Position not defined.");
    }

    // 💾 Save authentication details in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);
    localStorage.setItem("contact", user.contact);
    localStorage.setItem("aadhar", user.aadhar);
    localStorage.setItem("address", user.address);
    localStorage.setItem("campusName", user.campusName);
    localStorage.setItem("seatNumber", user.seatNumber);
    localStorage.setItem("profilePicture", user.profilePicture);

    // 🚪 Redirect based on user position
    const redirectMap = {
      admin: "admin-dashboard.html",
      teacher: "teacher-dashboard.html",
      student: "student-dashboard.html",
    };

    window.location.href = redirectMap[user.position] || "index.html";

  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
});
