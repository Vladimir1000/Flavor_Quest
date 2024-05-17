// 1. Display a webpage with a search input field and a search button.
// 2. When the user enters ingredients into the search input field and clicks the search button:
//    a. Retrieve the search term from the input field.
//    b. Validate the search term to ensure it is not empty.
//    c. If the search term is empty, display an alert message informing the user to enter at least one ingredient.
//    d. If the search term is valid:
//       i. Construct a URL with the search term as a query parameter.
//       ii. Send a GET request to the Edamam API.
//       iii. Receive the response from the API.
//       iv. Parse the response to grab the list of recipes.
//       v. Display the list of recipes on the webpage.
// 3. If there are no recipes found or an error occurs during the API request:
//    a. Display a message indicating that no recipes were found or there was a problem with the search.
// 4. Allow the user to view the full recipe details by clicking on a recipe.
// 5. End.

const resultsContainer = document.querySelector("#results-container");
// const detailedResults = document.querySelector("#detailed-results");
const left = document.querySelector("#left");
const right = document.querySelector("#right");

const URL_FOR_API = "https://api.edamam.com/api/recipes/v2"
const APP_ID="4049343b"
const APP_KEY="06da6463ec6165918bdc46e6fd5d0819"

function search(search_term) {
    
    axios({
        method: "get",
        url: URL_FOR_API +`?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${search_term.value}`
    }).then((response)=>{
        console.log(response.data);
        removePreviousElements();
        if(response.data.hits.length == 0) {
            alert("No elements found, please try again with a different term.")
        }
        addNewElementsBasedOnSearch(response);
    });

    console.log("TEST")
    
}

const form = document.querySelector('form'); 
 
form.addEventListener('submit', function(event) { 
  event.preventDefault(); 
}); 
// removePreviousElements() to clear previous elements
function removePreviousElements() {
    resultsContainer.innerHTML = "";
}


// removePreviousElementsInGetInfo() function
function removePreviousElementsInGetInfo() {
    left.innerHTML = "";
    right.innerHTML = ""; 
    
}


function getInfo(link) {
    axios({
        method: "get",
        url: link
    }).then((response)=>{
        // removePreviousElements() to clear previous elements
        removePreviousElementsInGetInfo();
        removePreviousElements();

        let ingredients = response.data.recipe.ingredients;
        let ingredientsList = document.createElement('ul');

        ingredients.forEach(element => {
            let listItem = document.createElement('li');
            listItem.textContent = element.text;
            ingredientsList.appendChild(listItem);
        });

        let nutrients = response.data.recipe.totalNutrients;
        let nutrientsList = document.createElement('ul');
       
      


        // Object.value to access the nutrients since they are stored in an objects
        Object.values(nutrients).forEach(element => {
            let listItem = document.createElement('li');
            listItem.textContent = element.label + ": " + Math.round(element.quantity) + " " + element.unit;
            nutrientsList.appendChild(listItem);
        });
       

        let image = document.createElement('img');
        image.src = response.data.recipe.image;
        
        let ingredientsLabel = document.createElement('h3');
        ingredientsLabel.textContent = "Ingredients:";
        
        
        
        let recipeLink = document.createElement('a');
        recipeLink.title = "recipe buttonForInstructions link";
        recipeLink.href = response.data.recipe.url;
        
        let buttonForInstructions = document.createElement('button');
        buttonForInstructions.className = "buttonForInstructions";
        buttonForInstructions.textContent = "Instructions";
        buttonForInstructions.onclick = () => {window.location.href = recipeLink.href};
        
        let nutrionValue = document.createElement('h3');
        nutrionValue.textContent = "Nutrition Value";

        let dietLabel = document.createElement('p');
        dietLabel.className = "diet-label";
        dietLabel.textContent = response.data.recipe.dietLabels;



        // Append ingredientsList, image and recipe link to left element and nutrientsList to right element
        left.appendChild(image);
        left.appendChild(ingredientsLabel);
        left.appendChild(ingredientsList);
        left.appendChild(buttonForInstructions);
        right.appendChild(nutrionValue);
        right.appendChild(dietLabel);
        right.appendChild(nutrientsList);
       
        
        

    })
}

function addNewElementsBasedOnSearch(response) {
    response.data.hits.forEach(element => {
        removePreviousElementsInGetInfo()
        let image = document.createElement('img');
        image.src = element.recipe.image;
        // image.textContent = image.setAttribute('src'. element.recipe.image);

        let title = document.createElement("h3");
        title.innerHTML = `${element.recipe.label} Calories: ${Math.round(element.recipe.calories)}`;

        let button = document.createElement("button");
        button.className = "view-more-info";
        button.textContent = "View More Info";
        button.onclick = () => {getInfo (element._links.self.href)};
        

        let card = document.createElement('div');
        card.className = "card"
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(button);
        resultsContainer.appendChild(card);       
    });
   
    // Function to load more recipes
function loadMoreRecipes(link) {

        axios({
            method: 'get',
            url: link
        }).then((response) => {
            removePreviousElements();

            if (response.data.hits.length === 0) {
                alert('No more recipes found.');
            } else {
                addNewElementsBasedOnSearch(response);
            }
        });
}

    // Event listener for the "Load More" button
    let loadMoreButton = document.createElement('button');
    loadMoreButton.textContent = "Load More";
    loadMoreButton.className = "load-more";
    resultsContainer.appendChild(loadMoreButton);
    loadMoreButton.onclick = () => {loadMoreRecipes(response.data._links.next.href)};
    

}


