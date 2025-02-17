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
        listElement.innerHTML = ''; // Clear previous content

        users.forEach(user => {
            const myCard = `
            <div class="card studentsCard">
                <div class="studentsCard__pic">
                    <img src="${user.profilePicture}" alt="Profile Picture">
                </div>
                <ul>
                    <li><strong>Name:</strong> ${user.name}</li>
                    <li><strong>Address:</strong> ${user.address}</li>
                </ul>
            </div>`;

            // Append card properly
            listElement.innerHTML += myCard;
        });
    } catch (error) {
        console.error(`Error fetching ${role}:`, error);
    }
}

// Fetch and display students
fetchUsers('students', 'studentsList');

// Fetch and display teachers
fetchUsers('teachers', 'teachersList');



const plansContainer = document.getElementById("plansContainer");
async function fetchPlans() {
  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans");
    const plans = await response.json();

    plansContainer.innerHTML = ""; // Clear previous plans

    plans.forEach(plan => {
      const planCard = document.createElement("div");
      planCard.className = "card padding--0 plans__card";
      planCard.innerHTML = `
        <div class="card__header">
          <img src="${plan.planBanner}" alt="Plan Banner" class="card__header__banner" />
        </div>
        <div class="plans__card__body">
          <h3 style="text-align: center">${plan.planName}</h3>
          <div class="card__plan">&#8377; ${plan.planValue} / ${plan.planDuration}</div>
        </div>
        <div class="card__footer">
          <button class="card__footer__btn btn--white">Purchase</button>
        </div>
      `;

      plansContainer.appendChild(planCard);
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
}
fetchPlans();
