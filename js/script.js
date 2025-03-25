// 🌐------------------- GLOBAL VARIABLES -------------------🌐
const toggler = document.getElementById("toggler");
// const sidebar = document.getElementById("sidebar");
const plansContainer = document.getElementById("plansContainer");

// 🚀------------------- 1. SIDEBAR TOGGLE FUNCTION -------------------🚀
// toggler.addEventListener("click", () => {
//   sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
// });

// 🧑------------------- 2. USER PROFILE & AUTH HANDLING -------------------🧑
document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `https://tutorji.onrender.com/api/users/profile/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      const user = await response.json();

      // Update Profile Picture & Name
      document.getElementById("profilePicture").src = user.profilePicture;
      document.getElementById("name").textContent = user.name;

      // Set Login/Logout Button
      const loginButton = document.getElementById("login");
      loginButton.textContent = "Logout";
      loginButton.addEventListener("click", () => {
        localStorage.clear();
        window.location.href = "index.html"; // Redirect to login page
      });
    } else {
      showLoginPrompt();
    }
  } catch (err) {
    console.error("Error fetching profile:", err);
    showLoginPrompt();
  }
});

function showLoginPrompt() {
  alert("Please register or log in!");
  const loginButton = document.getElementById("login");
  loginButton.textContent = "Login";
  loginButton.addEventListener(
    "click",
    () => (window.location.href = "login.html")
  );
}

// 📚------------------- 3. FETCH & DISPLAY USERS -------------------📚
async function fetchUsers(role, elementId) {
  try {
    const response = await fetch(`https://tutorji.onrender.com/api/users/${role}`);
    const users = await response.json();

    const listElement = document.getElementById(elementId);
    listElement.innerHTML = ""; // Clear previous content

    users.forEach((user, index) => {
      const userCard = document.createElement("div");
      userCard.className = "card studentsCard";

      // Add AOS attributes for flip animation
      userCard.setAttribute("data-aos", "flip-left"); // Flip effect
      userCard.setAttribute("data-aos-duration", "1000"); // Animation speed
      userCard.setAttribute("data-aos-delay", `${index * 100}`); // Staggered delay

      userCard.innerHTML = `
        <div class="studentsCard__pic">
          <img src="${user.profilePicture}" alt="Profile Picture">
        </div>
        <ul>
          <li>${user.name}</li>
          <li>${user.address}</li>
        </ul>
      `;

      listElement.appendChild(userCard);
    });

    // Reinitialize AOS after adding new elements
    AOS.init();
    
  } catch (error) {
    console.error(`Error fetching ${role}:`, error);
  }
}

// Initialize AOS on Page Load
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
});


// Fetch and display students and teachers
fetchUsers("students", "studentsList");
fetchUsers("teachers", "teachersList");

// 📝------------------- 4. FETCH & DISPLAY PLANS -------------------📝
async function fetchPlans() {
  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans");
    const plans = await response.json();

    plansContainer.innerHTML = ""; // Clear previous plans

    plans.forEach((plan, index) => {
      const planCard = document.createElement("div");
      planCard.className = "card plans__card card--padding0";
      
      // Add AOS attributes for animation
      planCard.setAttribute("data-aos", "fade-up"); // Animation type
      planCard.setAttribute("data-aos-delay", `${index * 100}`); // Staggered animation delay

      planCard.innerHTML = `
        <div class="card__header">
          <img src="${plan.planBanner}" alt="Plan Banner" class="card__header__banner" />
        </div>
        <div class="plans__card__body">
          <h3 style="text-align: center">${plan.planName}</h3>
          <div class="card__plan">&#8377;${plan.planValue}/${plan.planDuration}</div>
        </div>
        <div class="card__footer">
          <button class="card__footer__btn">Subscribe</button>
        </div>
      `;

      plansContainer.appendChild(planCard);
    });

    // Reinitialize AOS after adding new elements
    AOS.init();
    
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
}

// Initialize AOS on Page Load
document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
});


// Fetch plans on page load
fetchPlans();

document
  .getElementById("queryForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Please log in first.");

    const querrySubject = document.getElementById("subject").value;
    const querryDetails = document.getElementById("details").value;

    try {
      const response = await fetch(
        "https://tutorji.onrender.com/api/queries/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ querrySubject, querryDetails }),
        }
      );

      if (response.ok) {
        alert("Query submitted successfully!");
        document.getElementById("queryForm").reset();
      } else {
        const error = await response.json();
        alert(`Failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error, please try again.");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  const bubbleContainer = document.querySelector(".hero");
  for (let i = 0; i < 10; i++) {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    let size = Math.random() * 40 + 10;
    let position = Math.random() * 100;
    let duration = Math.random() * 5 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${position}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubbleContainer.appendChild(bubble);
  }
});

function toggleMenu() {
  let nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}


document.addEventListener("DOMContentLoaded", () => {
  AOS.init(); // Initialize AOS animations
  loadGallery();
});

function loadGallery() {
    const imageGallery = [
"https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
"https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
"https://images.pexels.com/photos/34950/pexels-photo.jpg",
"https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
"https://images.pexels.com/photos/35600/road-sun-rays-path.jpg",
"https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg",
"https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg",
"https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg",
"https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg",
"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg",
"https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg"
];

  const galleryContainer = document.getElementById("gallery");
  galleryContainer.innerHTML = "";

  imageGallery.forEach((src, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    
    // Add AOS Animation
    galleryItem.setAttribute("data-aos", "zoom-in");
    galleryItem.setAttribute("data-aos-duration", "800");
    galleryItem.setAttribute("data-aos-delay", `${index * 100}`);

    galleryItem.innerHTML = `<img src="${src}" alt="Gallery Image">`;
    galleryContainer.appendChild(galleryItem);
  });

  AOS.refresh(); // Refresh AOS to apply animations
}