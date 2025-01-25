document.getElementById('sidebar').innerHTML = 
`  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <h2></h2>
    <ul>
      <li><a href="admin-dashboard.html"><i>🏠</i> Dashboard</a></li>
      <li><a href="admin-proflile.html"><i>👨</i> Admin Profile</a></li>
      <li><a href="inquiary.html"><i>❓</i> Inquiary</a></li>
      <li><a href="students.html"><i>🎓</i> Students</a></li>
      <li><a href="teachers.html"><i>👩‍🏫</i> Teachers</a></li>
      <li><a href="analitics.html"><i>📊</i> Analitics</a></li>
      <li><a href="delete-student.html"><i>❌</i> Delete Students</a></li>
      <li><a href="delete-teacher.html"><i>❌</i> Delete Teachers</a></li>
    </ul>
  </div>`
  let isHamburger = true;
  console.log(`this is the status of ${isHamburger}`)

  document.getElementById('navbar').innerHTML = 
  `<div class="toggler" id="toggler" > 
  ${!isHamburger ? '&#10005;' : "&#9776;" }
  </div>
      <div class="admin-info">
        <img id="profilePicture" src="admin-logo.png" alt="Admin Logo">
        <span id="name">Admin Name</span>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search...">
        <button>Search</button>
      </div>`

  const sidebar = document.querySelector('.sidebar')
  const mainContent = document.querySelector('.main-content');
  toggler.addEventListener('click', function(){
    if(sidebar.style.display == ""){
    // toggler.style.transform = "rotate(180deg)"
    sidebar.style.display = "none";
    isHamburger = false;
    console.log(isHamburger)
    } else if(sidebar.style.display = "none"){
      // toggler.style.transform = "rotate(0deg)"
    sidebar.style.display = "";
    isHamburger = true;
    console.log(isHamburger)
    }
  });