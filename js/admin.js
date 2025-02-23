// 🌟 Element Selections
const addAbout = document.getElementById("addAbout");
const vPlans = document.getElementById("vPlans");
const view = document.getElementById("view");
const plansContainer = document.getElementById("plansContainer");
const cover = document.querySelector(".cover");

// 📝 Forms & Templates
const aboutFormTemplate = `
  <form id="aboutForm" enctype="multipart/form-data">
    <label for="aboutUs">About Us:</label>
    <input type="text" id="aboutUs" name="aboutUs">

    <label for="copyRight">Copy Right:</label>
    <input type="text" id="copyRight" name="copyRight">

    <button type="submit">Submit</button>
  </form>
`;

const planFormTemplate = `
  <form id="planForm" enctype="multipart/form-data">
    <label for="planName">Plan Name:</label>
    <input type="text" id="planName" name="planName" required>

    <label for="planValue">Plan Value (₹):</label>
    <input type="number" id="planValue" name="planValue" required>

    <label for="planDuration">Plan Duration:</label>
    <input type="text" id="planDuration" name="planDuration" required>

    <label for="planBanner">Plan Banner:</label>
    <input type="file" id="planBanner" name="planBanner" accept="image/*" required>

    <button type="submit">Add Plan</button>
  </form>
`;

// 🖥️ Navigation Handlers
addAbout.addEventListener("click", () => {
  highlightTab(addAbout);
  renderContent(aboutFormTemplate);
});

vPlans.addEventListener("click", () => {
  highlightTab(vPlans);
  renderContent(""); // Clear content
  document.querySelector(".dashboard__content").appendChild(plansContainer);
});

view.addEventListener("click", () => {
  highlightTab(view);
  renderContent(planFormTemplate);
  handlePlanFormSubmit();
  fetchPlans();
});

// 🔔 Utility Functions
function highlightTab(activeTab) {
  [addAbout, vPlans, view].forEach(tab => tab.style.background = "");
  activeTab.style.background = "black";
}

function renderContent(content) {
  document.querySelector(".dashboard__content").innerHTML = content;
}

function handlePlanFormSubmit() {
  document.getElementById("planForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://tutorji.onrender.com/api/plans", {
        method: "POST",
        body: formData,
      });

      response.ok ? alert("Plan added successfully!") : alert("Failed to add plan");
      fetchPlans();
    } catch (error) {
      console.error("Error:", error);
    }
  });
}

// 📄 Fetch and Display Plans
async function fetchPlans() {
  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans");
    const plans = await response.json();

    plansContainer.innerHTML = ""; // Clear old plans

    plans.forEach(plan => {
      const planCard = createPlanCard(plan);
      plansContainer.appendChild(planCard);
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
}

// 📦 Plan Card Generator
function createPlanCard(plan) {
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
  `;

  planCard.addEventListener("click", () => showPlanOptions(plan));
  return planCard;
}

// 📝 Plan Options (View, Update, Delete)
function showPlanOptions(plan) {
  if (!cover) return console.error("Cover element not found!");

  const isHidden = window.getComputedStyle(cover).display === "none";
  cover.innerHTML = isHidden ? `
    <div class="subsBox">
      <h1>&#8377;${plan.planValue} / ${plan.planDuration}</h1>
      <h3>${plan.planName}</h3>
      <button class="card__footer__btn btn--update updatePlan">Edit</button>
      <button class="card__footer__btn btn--dlt dltPlan">Delete</button>
    </div>` : "";

  cover.style.display = isHidden ? "flex" : "none";

  if (isHidden) {
    document.querySelector(".updatePlan").addEventListener("click", () => updatePlanForm(plan));
    document.querySelector(".dltPlan").addEventListener("click", () => deletePlan(plan._id));
  }
}

// 🛠️ Update Plan Form
function updatePlanForm(plan) {
  cover.innerHTML = `
    <form id="updatePlanForm" enctype="multipart/form-data">
      <label for="planName">Plan Name:</label>
      <input type="text" id="planName" value="${plan.planName}" required>

      <label for="planValue">Plan Value (₹):</label>
      <input type="number" id="planValue" value="${plan.planValue}" required>

      <label for="planDuration">Plan Duration:</label>
      <input type="text" id="planDuration" value="${plan.planDuration}" required>

      <label for="planBanner">Plan Banner:</label>
      <input type="file" id="planBanner" accept="image/*">

      <button type="submit" class="btn--update">Update Plan</button>
    </form>
  `;

  document.getElementById("updatePlanForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch(`https://tutorji.onrender.com/api/plans/update/${plan._id}`, {
        method: "PATCH",
        body: formData,
      });

      if (response.ok) {
        alert("Plan updated successfully!");
        fetchPlans();
        cover.style.display = "none";
      } else {
        const error = await response.json();
        alert(`Update failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error updating plan:", err);
    }
  });
}

// ❌ Delete Plan
async function deletePlan(planId) {
  const confirmation = confirm("Are you sure you want to delete this plan?");
  if (!confirmation) return;

  try {
    const response = await fetch(`https://tutorji.onrender.com/api/plans/delete/${planId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Plan deleted successfully!");
      fetchPlans();
      cover.style.display = "none";
    } else {
      const error = await response.json();
      alert(`Delete failed: ${error.message}`);
    }
  } catch (err) {
    console.error("Error deleting plan:", err);
    alert("An unexpected error occurred.");
  }
}

// 🚀 Initial Load
fetchPlans();
