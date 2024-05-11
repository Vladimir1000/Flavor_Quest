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
