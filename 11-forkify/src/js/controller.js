console.log("forkify🔪😋")

import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import searchView from './views/searchView.js';
import RecipeView from './views/recipeView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import bookMarksView from './views/bookMarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import paginationView from './views/paginationView.js';

import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime'; 
import addRecipeView from './views/addRecipeView.js';


const recipeContainer = document.querySelector('.recipe');
///////////////////////////////////////


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    //0 Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // 1) Loading Recipe 
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2 Rendering Recipe
    recipeView.render(model.state.recipe);
    
    //3 Updating bookmarks view
    bookMarksView.update(model.state.bookmarks);
    
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchRecipes = async function () {
  try {
    resultsView.renderSpinner();
    //1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;
    //2. Load search results
    await model.loadSearchResults(query);
    // 3) Render results
    /*    resultsView.render(model.state.search.results) */
    resultsView.render(model.getSearchResultsPage());

    // 4) Render inital Pagination buttons;
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //1. Render New results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render New Pagination buttons;
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  //Update the recipe View
/* recipeView.render(model.state.recipe);  */
recipeView.update(model.state.recipe);
};


const controlAddBookmark = function(){
  //1) Add or remove Bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

 //2 Update recipe View
  recipeView.update(model.state.recipe);

  //3 Render Bookmarks
  bookMarksView.render(model.state.bookmarks);
}


const controlBookmarks = function(){
  bookMarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  console.log(model.state.recipe);
  console.log(newRecipe);


  try {
    //Show loading recipe
    addRecipeView.renderSpinner();
    //Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    //Render Recipe
    recipeView.render(model.state.recipe);


    //Success Message
    addRecipeView.renderMessage();


    //Render Bookmark View
    bookMarksView.render(model.state.bookmarks);

    //Change Id in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //window.history.back()

    //close from window
    setTimeout(function(){
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 10000);

    
  } catch (error) {
    console.log('💥', error);
    addRecipeView.renderError(error.message);

  }
}


const init = function () { 
  bookMarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings); 
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();


