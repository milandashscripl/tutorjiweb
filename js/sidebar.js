// 🚀------------------- SIDEBAR CONTENT -------------------🚀
document.getElementById('sidebar').innerHTML = `
  <ul>
    <li><a href="admin-dashboard.html"><i>🏠</i> Dashboard</a></li>
    <li><a href="admin-profile.html"><i>👨</i> Admin Profile</a></li>
    <li><a href="inquiry.html"><i>❓</i> Queries</a></li>
    <li><a href="students.html"><i>🎓</i> Students</a></li>
    <li><a href="teachers.html"><i>👩‍🏫</i> Teachers</a></li>
    <li><a href="analytics.html"><i>📊</i> Analytics</a></li>
    <li>
      <div id="logout" class="logout-btn" style="background:orangered; color:white; padding:5px; width: 80%; text-align:center; margin:0 auto">Logout</div>
    </li>
  </ul>
`;

// 🚪 Logout Handler
document.getElementById('logout').addEventListener('click', () => {
  localStorage.clear();
  window.location.href = 'index.html'; // Redirect to login page
});


// 🧭------------------- NAVBAR CONTENT -------------------🧭
document.getElementById('navbar').innerHTML = `
  <div class="toggler" id="toggler">&#9776;</div>
  <div class="admin-info">
    <img id="profilePicture" src="admin-logo.png" alt="Admin Logo">
    <span id="name">Admin Name</span>
  </div>
  <div class="search-bar">
    <input type="text" placeholder="Search..." />
    <button>Search</button>
  </div>
`;

// 📂------------------- SIDEBAR TOGGLE FUNCTIONALITY -------------------📂
const toggler = document.getElementById('toggler');
const sidebar = document.getElementById('sidebar');

toggler.addEventListener('click', () => {
  sidebar.style.display = (sidebar.style.display === 'none' || sidebar.style.display === '') ? 'block' : 'none';
});
