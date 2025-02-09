// Toggle Sidebar Visibility
const toggler = document.getElementById('toggler');
const sidebar = document.getElementById('sidebar');

toggler.addEventListener('click', function () {
  if (sidebar.style.display === 'none' || sidebar.style.display === '') {
    sidebar.style.display = 'block';
  } else {
    sidebar.style.display = 'none';
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
      if(user){
      document.getElementById("login").textContent = "Logout"
        document.getElementById('login').addEventListener('click', () => {
          localStorage.clear();
          window.location.href = 'index.html'; // Redirect to login page
      })
    } else{
      document.getElementById("login").textContent = "Login"
      document.getElementById('login').addEventListener('click', () => {
        window.location.href = 'login.html'; // Redirect to login page
    })
    }
    } else {
      alert("please register or login yourself!");
      document.getElementById("login").textContent = "Login"
      document.getElementById('login').addEventListener('click', () => {
        window.location.href = 'login.html'; // Redirect to login page
    })
    }
  });



  async function fetchUsers(role, elementId) {
    try {
        const response = await fetch(`https://tutorji.onrender.com/api/users/${role}`);
        const users = await response.json();

        const listElement = document.getElementById(elementId);
        // listElement.innerHTML = '';

        users.forEach(user => {
          const myCard = ` <div class="card studentsCard">
            <div class="studentsCard__pic">
              <img src="${user.profilePicture}" alt="">
            </div>
            <ul>
              <li>Name: ${user.name}</li>
              <li>Email: ${user.email}</li>
              <li>Contact: ${user.contact}</li>
              <li>Address: ${user.address}</li>
            </ul>
          </div>`
            // const listItem = document.createElement('li');
            // listItem.textContent = `${user.name} - ${user.email}`;
            listElement.appendChild(myCard);
        });
    } catch (error) {
        console.error(`Error fetching ${role}:`, error);
    }
}

// Fetch and display students
fetchUsers('students', 'studentsList');

// Fetch and display teachers
fetchUsers('teachers', 'teachersList');
