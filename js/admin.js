const addAbout = document.getElementById("addAbout");
const vPlans = document.getElementById("vPlans");
const view = document.getElementById("view");
const portal = `<form id="aboutForm" enctype="multipart/form-data">
      <label for="aboutUs">About Us:</label>
      <input type="text" id="aboutUs" name="aboutUs">

      <label for="copyRight">Copy Right:</label>
      <input type="text" id="copyRight" name="copyRight">

      <button type="submit">Submit</button>
    </form>
`;

// Create a container
const container = document.createElement("div");
const plansContainer = document.getElementById("plansContainer");
addAbout.style.background = "black";
view.style.background = "";
vPlans.style.background = "";
document.querySelector(".dashboard__content").innerHTML = portal;
addAbout.addEventListener("click", function () {
  addAbout.style.background = "black";
  view.style.background = "";
  vPlans.style.background = "";
  document.querySelector(".dashboard__content").innerHTML = "";
  document.querySelector(".dashboard__content").innerHTML = portal;
});

// view
vPlans.addEventListener("click", function () {
  vPlans.style.background = "black";
  view.style.background = "";
  addAbout.style.background = "";
  document.querySelector(".dashboard__content").innerHTML = "";
  // Append the container to the dashboard content
  document.querySelector(".dashboard__content").appendChild(plansContainer);
});
view.addEventListener("click", function () {
  view.style.background = "black";
  vPlans.style.background = "";
  addAbout.style.background = "";
  document.querySelector(".dashboard__content").innerHTML = `
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

  // Add Form Submit Event Listener
  document
    .getElementById("planForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = new FormData();
      formData.append("planName", document.getElementById("planName").value);
      formData.append("planValue", document.getElementById("planValue").value);
      formData.append(
        "planDuration",
        document.getElementById("planDuration").value
      );
      formData.append(
        "planBanner",
        document.getElementById("planBanner").files[0]
      );

      try {
        const response = await fetch("https://tutorji.onrender.com/api/plans", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Plan added successfully!");
          fetchPlans(); // Fetch and display plans
        } else {
          alert("Failed to add plan");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });

  // Fetch and display existing plans
  fetchPlans();
});
const cover = document.querySelector(".cover");
async function fetchPlans() {
  try {
    const response = await fetch("https://tutorji.onrender.com/api/plans");
    const plans = await response.json();

    plansContainer.innerHTML = ""; // Clear previous plans

    plans.forEach((plan) => {
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
          
        </div>
      `;
      planCard.addEventListener("click", () => {
        if (!cover) {
          console.error("Cover element not found!");
          return;
        }

        const isHidden = window.getComputedStyle(cover).display === "none";

        if (isHidden) {
          cover.innerHTML = `
      <div class="subsBox">
        <h1>&#8377;${plan.planValue} / ${plan.planDuration}</h1>
        <h3>Pay &#8377;${plan.planValue}/- Now</h3>
        <button class="card__footer__btn btn--update updatePlan">Edit</button>
        <button class="card__footer__btn btn--dlt dltPlan">Delete</button>
      </div>
      `;
          cover.style.display = "flex"; // Show after injecting HTML
        } else {
          cover.style.display = "none"; // Hide if already visible
        }
        const update = document.querySelector(".updatePlan");
        const del = document.querySelector(".dltPlan");
        const planId = localStorage.getItem('planId');
        const formData = new FormData();
        update.addEventListener("click", function () {
          cover.innerHTML = ``;
          cover.innerHTML = `<form id="updatePlanForm" enctype="multipart/form-data">
      <label for="planName">Plan Name:</label>
      <input type="text" id="planName" name="planName">

      <label for="planValue">Plan Value (₹):</label>
      <input type="number" id="planValue" name="planValue">

      <label for="planDuration">Plan Duration:</label>
      <input type="text" id="planDuration" name="planDuration">

      <label for="planBanner">Plan Banner:</label>
      <input type="file" id="planBanner" name="planBanner" accept="image/*">

      <button type="submit" class = "btn--update">Update Plan</button>
    </form>`;
          document.getElementById("planName").value = plan.planName;
          document.getElementById("planValue").value = plan.planValue;
          document.getElementById("planDuration").value = plan.planDuration;
          document.getElementById("planBanner").value = plan.planBanner;


          document.getElementById('updatePlanForm').addEventListener('submit', async (event) => {
            event.preventDefault();
          
          
            // Append form fields to FormData
            formData.append("planName", document.getElementById("planName").value);
      formData.append("planValue", document.getElementById("planValue").value);
      formData.append(
        "planDuration",
        document.getElementById("planDuration").value
      );
      formData.append(
        "planBanner",
        document.getElementById("planBanner").files[0]
      );
          
          
          
            try {
              const response = await fetch(`https://tutorji.onrender.com/api/plans/update/${planId}`, {
                method: 'PATCH',
                body: formData,
              });
          
              if (response.ok) {
                const data = await response.json();
                alert('plan updated successfully!');
                console.log('Updated user:', data.user);
                window.location.href = '/admin-dashboard.html';
              } else {
                const error = await response.json();
                alert(`Update failed: ${error.message}`);
              }
            } catch (err) {
              console.error('Error updating plan:', err);
              alert('An unexpected error occurred. Please try again later.');
            }
          });
        });



        // delete plan 

        
        del.addEventListener("click", function () {
          cover.innerHTML = ``;
          cover.innerHTML = `      <div class="subsBox">
        <h1>&#8377;${plan.planValue} / ${plan.planDuration}</h1>
        <h3>Pay &#8377;${plan.planValue}/- Now</h3>
        <button class="card__footer__btn btn--dlt confirm">Delete</button>
        <button class="card__footer__btn btn--freeze cancell">Cancell</button>
      </div>`;
          const cancell = document.querySelector(".cancell");
          const confirm = document.querySelector(".confirm");
          cancell.addEventListener("click", function () {
            cover.style.display = "none";
          });
          confirm.addEventListener("click", function () {});
        });
      });

      plansContainer.appendChild(planCard);
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
  }
}
fetchPlans();
