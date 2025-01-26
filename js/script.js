const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector(".main-content");
  toggler.addEventListener("click", function () {
    if (sidebar.style.display == "") {
      // toggler.style.transform = "rotate(180deg)"
      sidebar.style.display = "none";
    } else if ((sidebar.style.display = "none")) {
      // toggler.style.transform = "rotate(0deg)"
      sidebar.style.display = "";
    }
  });



    document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://tutorji.onrender.com/api/users/profile/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const user = await response.json();
      document.getElementById("profilePicture").src = user.profilePicture;
      document.getElementById("name").textContent = user.name;
      document.getElementById("email").textContent = user.email;
      document.getElementById("contact").textContent = user.contact;
      document.getElementById("aadhar").textContent = user.aadhar;
      document.getElementById("address").textContent = user.address;
      document.getElementById("login").innerHTML = `<i>🙇</i> Logout`
        document.getElementById('login').addEventListener('click', () => {
          localStorage.clear();
          window.location.href = 'index.html'; // Redirect to login page
      })
    } else {
      alert("please register or login yourself!");
      document.getElementById("login").innerHTML = `<i>🙇</i> Login`
    }
  });