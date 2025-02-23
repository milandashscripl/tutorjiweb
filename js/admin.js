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
    <input type="text" name="planName" required>

    <label for="planValue">Plan Value (₹):</label>
    <input type="number" name="planValue" required>

    <label for="planDuration">Plan Duration:</label>
    <input type="text" name="planDuration" required>

    <label for="planBanner">Plan Banner:</label>
    <input type="file" name="planBanner" accept="image/*" required>

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
  renderContent("");
  document.querySelector(".dashboard__content").appendChild(plansContainer);
});

view.addEventListener("click", () => {
  highlightTab(view);
  renderContent(planFormTemplate);
  document.getElementById("planForm").addEventListener("submit", handlePlanFormSubmit);
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

async function handlePlanFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Plan added successfully!");
      event.target.reset();
      fetchPlans();
    } else {
      const error = await response.json();
      alert(`Failed to add plan: ${error.message}`);
    }
  } catch (error) {
    console.error("Error adding plan:", error);
  }
}

// 📄 Fetch and Display Plans
async function fetchPlans() {
  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans");
    const plans = await response.json();

    plansContainer.innerHTML = plans.length ? "" : "<p>No plans available.</p>";

    plans.forEach(plan => plansContainer.appendChild(createPlanCard(plan)));
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
      <h3>${plan.planName}</h3>
      <div class="card__plan">₹${plan.planValue} / ${plan.planDuration}</div>
      <div class="plans__actions">
        <button class="btn--update">Edit</button>
        <button class="btn--dlt">Delete</button>
      </div>
    </div>
  `;

  planCard.querySelector(".btn--update").addEventListener("click", () => showUpdatePlanForm(plan));
  planCard.querySelector(".btn--dlt").addEventListener("click", () => deletePlan(plan._id));

  return planCard;
}

// 🛠️ Update Plan Form
function showUpdatePlanForm(plan) {
  cover.innerHTML = `
    <form id="updatePlanForm" enctype="multipart/form-data" class="update__form">
      <label>Plan Name:</label>
      <input type="text" name="planName" value="${plan.planName}" required>

      <label>Plan Value (₹):</label>
      <input type="number" name="planValue" value="${plan.planValue}" required>

      <label>Plan Duration:</label>
      <input type="text" name="planDuration" value="${plan.planDuration}" required>

      <label>Plan Banner:</label>
      <input type="file" name="planBanner" accept="image/*">

      <button type="submit">Update Plan</button>
    </form>
  `;

  cover.style.display = "flex";

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
        cover.style.display = "none";
        fetchPlans();
      } else {
        const error = await response.json();
        alert(`Update failed: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  });
}

// ❌ Delete Plan
async function deletePlan(planId) {
  if (!confirm("Are you sure you want to delete this plan?")) return;

  try {
    const response = await fetch(`https://tutorji.onrender.com/api/plans/delete/${planId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Plan deleted successfully!");
      fetchPlans();
    } else {
      const error = await response.json();
      alert(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error("Error deleting plan:", error);
  }
}

// 🚀 Initial Load
fetchPlans();