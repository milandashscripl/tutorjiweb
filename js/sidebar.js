// Sidebar content
document.getElementById('sidebar').innerHTML = `
  <h2></h2>
  <ul>
    <li><a href="admin-dashboard.html"><i>🏠</i> Dashboard</a></li>
    <li><a href="admin-proflile.html"><i>👨</i> Admin Profile</a></li>
    <li><a href="inquiary.html"><i>❓</i> Queries</a></li>
    <li><a href="students.html"><i>🎓</i> Students</a></li>
    <li><a href="teachers.html"><i>👩‍🏫</i> Teachers</a></li>
    <li><a href="analitics.html"><i>📊</i> Analytics</a></li>
    <li>
    <div id="login" style="background:orangered; color:white; width:90%; padding:5px 0; border-radius: 5px; margin: 0 auto; text-align:center">Logout</div>
    </li>
  </ul>`;

  document.getElementById('login').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html'; // Redirect to login page
})
// Navbar content
document.getElementById('navbar').innerHTML = `
  <div class="toggler" id="toggler">&#9776;</div>
  <div class="admin-info">
    <img id="profilePicture" src="admin-logo.png" alt="Admin Logo">
    <span id="name">Admin Name</span>
  </div>
  <div class="search-bar">
    <input type="text" placeholder="Search...">
    <button>Search</button>
  </div>`;

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


