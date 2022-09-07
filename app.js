// Collect Data
const searchMeal = () => {
  const formInput = document.getElementById("formInput").value;

  // Check If User Searched For Anything
  if (formInput) {
    // Clear Previously Showed Data
    const noResult = document.getElementById("no-result");
    noResult.innerText = ``;

    const mealDetailsSection = document.getElementById("meal-Details-section");
    mealDetailsSection.innerHTML = ``;

    const singleMealDetails = document.getElementById("single-meal-details");
    singleMealDetails.innerHTML = ``;

    //Fetch Data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${formInput}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        showMeals(data, formInput);
      });
  } else {
    const noResult = document.getElementById("no-result");
    noResult.innerText = `You haven't Searched For anything`;
  }
};

// Show Meals
const showMeals = (data, formInput) => {
  const meals = data.meals;

  // Check If Searched Meal Is Found Or Not
  if (meals) {
    meals.forEach((meal) => {
      MealDetailsDiv(meal, formInput);
      //Clear Input Text
      document.getElementById("formInput").value = "";
    });
  } else {
    const noResult = document.getElementById("no-result");
    noResult.innerHTML = `<h3>Sorry, No meal found for ${formInput}! &#128543;</h3>`;
    //Clear Input Text
    document.getElementById("formInput").value = "";
  }
};

// Create Meal Details Div
const MealDetailsDiv = (meal, formInput) => {
  const mealID = meal.idMeal;
  const mealPhoto = meal.strMealThumb;
  const mealName = meal.strMeal;
  const mealDetails = `
            <a href="#single-meal-details" class="meal-section">
                <div onclick="getMealDetails(${mealID})" class="card border-0 shadow cursor meal-card">
                    <img src="${mealPhoto}" class="card-img-top meal-img" alt="${mealName}">
                    <div class="card-body d-flex align-items-center justify-content-center">
                        <h5 class="card-title text-center">${mealName}</h5>
                    </div>
                </div>
            </a>
            `;
  const mealDetailsSection = document.getElementById("meal-Details-section");
  const mealDetailsDiv = document.createElement("div");
  mealDetailsDiv.className =
    "col-sm-1 col-md-6 col-lg-4 p-3 d-flex justify-content-evenly";
  mealDetailsDiv.innerHTML = mealDetails;
  mealDetailsSection.appendChild(mealDetailsDiv);
};

// Search when pressed Enter
document.getElementById("formInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("inputSubmit").click();
  }
});

//Single Meal Data collect
const getMealDetails = (mealID) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSingleMealDetails(data);
    });
};

//Show Single Meal Details
const showSingleMealDetails = (data) => {
  const meal = data.meals[0];
  const mealPhoto = meal.strMealThumb;
  const mealName = meal.strMeal;
  const mealInstructions = meal.strInstructions;
  const mealVideo = meal.strYoutube;

  const singleMealDetails = document.getElementById("single-meal-details");
  singleMealDetails.innerHTML = `
      <div class="row m-3">
        <span onclick="backBTN()" class="back-btn"> &#11013;</span>
      </div>

        <div id="meal-details" class="card px-0 shadow col-sm-12 col-md-6 meal-details">
            <img src="${mealPhoto}" class="card-img-top" alt="${mealName}">
            <h2 class="card-title single-meal-title text-center">${mealName}</h2><hr>
            <div id="meal-info" class="card-body p-3">
              <div id="meal-ingredients">
                <h5 class="card-title">Meal Ingredients</h5>
              </div>
              <div class="other-info my-3">
                <h5 class="card-title my-2">Meal Instructions</h5>
                <P class="card-text">${mealInstructions}</P>
                <div class="text-center">
                <a href="${mealVideo}" target="_blank" class="meal-video">Watch Video</a>
                </div>
              </div>
            </div>    
        </div>
  `;

  const mealIngredients = document.getElementById("meal-ingredients");

  // Get Ingredients and set In the card

  for (let i = 1; meal[`strIngredient${i}`]; i++) {
    const mealIngredient = document.createElement("div");
    mealIngredient.className = "meal-ingredient";
    mealIngredient.innerHTML = `
      <p class="card-text" >
      &#x2705; ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
      </p>
    `;
    mealIngredients.appendChild(mealIngredient);
  }

  //Hide all Meal Section
  const mealDetailsSection = document.getElementById("meal-Details-section");
  mealDetailsSection.style = "display:none";
};

//Back Button Click
const backBTN = () => {
  const singleMealDetails = document.getElementById("single-meal-details");
  singleMealDetails.innerHTML = "";
  const mealDetailsSection = document.getElementById("meal-Details-section");
  mealDetailsSection.style = "visibility: visible";
};