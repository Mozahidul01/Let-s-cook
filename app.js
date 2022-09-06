const searchMeal = () => {
  const formInput = document.getElementById("formInput").value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${formInput}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showMealInfo(data, formInput);
    });
};

const createMealInfoDiv = (meal, formInput) => {
  const mealPhoto = meal.strMealThumb;
  const mealName = meal.strMeal;
  const mealInfo = `
            <a href="#meal-details-section" style="text-decoration: none; color: black;">
                <div class="card border-0 shadow cursor meal-card" style="width: 18rem; border-radius: 10px">
                    <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
                    <div class="card-body">
                        <h5 class="card-title text-center">${mealName}</h5>
                    </div>
                </div>
            </a>
            `;
  const mealInfoSection = document.getElementById("meal-info-section");
  const mealInfoDiv = document.createElement("div");
  mealInfoDiv.className =
    "col-sm-1 col-md-6 col-lg-4 p-3 d-flex justify-content-evenly";
  mealInfoDiv.innerHTML = mealInfo;
  mealInfoSection.appendChild(mealInfoDiv);
};

const showMealInfo = (data, formInput) => {
  const meal = data.meals;

  // Check If Searched Meal Is Found Or Not
  if (meal) {
    meal.forEach((element) => {
      createMealInfoDiv(element, formInput);
    });
  } else {
    const noMealFound = document.getElementById("no-meal-found");
    noMealFound.innerText = `No meal found for ${formInput}!`;
  }
};

document.getElementById("inputSubmit").addEventListener("click", searchMeal);
document.getElementById("formInput").addEventListener("submit", searchMeal);
