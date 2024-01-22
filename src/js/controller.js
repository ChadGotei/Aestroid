//TODO: Main js file

//! Importing other files (connecting all files kinda).
import * as helper from './helpers.js';
import * as model from './model.js';
import * as appear from './appear.js';

import animeView from './views/animeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import View from './views/View.js';

//! Main controlling js file.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

//! Some important gloabl scopped variables and selectors.
const container = document.querySelector('.container');
const animeSection = document.querySelector('.anime');
const btnInline = document.querySelectorAll('.btn--inline');
const view = new View();

helper.spinnerOpacity(0);
container.style.minHeight = '125rem';

let linkName;
let isAnimeView = false;

//? To decrease the size of font if name is too large 
function handleAnimeName() {
  const title = document.querySelector('.title');
  const nameLength = linkName.length;

  if (nameLength >= 20) {
    title.classList.add('big');
  }
}

//? to handle the clicks on we can say 'cards'.
function handleLinkClick(event, tagName = '.preview__link') {
  const link = event.target.closest(tagName);
  if (link) {
    container.style.minHeight = '125rem';
    event.preventDefault();
    linkName = link.dataset.name;
    animeSection.innerHTML = '';
    document.querySelector('.results').innerHTML = '';

    appear.removingPagesButton();

    controlAnime();
  }
}

//? TO show the anime (specific anime details)
const controlAnime = async function () {
  try {
    helper.spinnerOpacity(1);

    await model.loadAnime(linkName);

    if (!linkName) {
      helper.spinnerOpacity(0);
      console.log('meow');
      return;
    }

    isAnimeView = true;

    animeView.render(model.state.anime);
    
    handleAnimeName();
    if (linkName === 'N/A') {
      view.errorHandling('Not enough information')
    }
    
    // bookmarkView.update(model.state.anime);
    helper.spinnerOpacity(0);

  } catch (err) {
    console.error(err);
  }
};


//? To manage the results (search Results) 
const controlSearchResults = async function () {
  try {
    // some default settings
    helper.spinnerOpacity(1);
    animeSection.innerHTML = ``;
    isAnimeView = false;

    // 1.) Get search query
    const query = searchView.getQuery();

    // 2.) Load Search result
    await model.loadSearchResults(query);

    if (!query) {
      helper.spinnerOpacity(0);
      return;
    };

    // 3.) Rendering search result
    resultsView.render(model.getSearchResultPage(1));

    // 4.) Rendering pagination views.
    if (model.state.search.results.length > 6) {
      //* increasing the size of the container if we get more than 5 search results.
      container.style.minHeight = '168rem';
    }

    paginationView.render(model.state.search);

    helper.spinnerOpacity(0);
    
  } catch (err) {
    console.error(err);
  }
}

//? To implement the pages thingy
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  if (model.state.search.results.length > 6) {
    container.style.minHeight = '168rem';
  }

  paginationView.render(model.state.search);
}


//? Sign up modal 
const controlModalView = function () {
  appear.modal.classList.remove('hidden');
  appear.overlay.classList.remove('hidden')
}

const controlModalClosed = function () {
  appear.modal.classList.add('hidden');
  appear.overlay.classList.add('hidden');
}


//? Generating top random anime at welcome page (to make it look realistic)
//* but due to limitations of being able to generate 25 anime at a time, the results are really limited
const loadAndRenderTopAnime = async function () {
  try {
    if (isAnimeView) return;

    helper.spinnerOpacity(1);

    // Load top anime
    await model.topAnime();
    const randomPage = Math.floor(Math.random() * 3) + 1;

    // Render the top anime results with the random page number
    resultsView.render(model.getTopAnimePages(randomPage));
    paginationView.render(model.state.search);

    container.style.minHeight = '168rem';
    //paginationView.render(model.state.search);

    // console.log(model.state.search.topanimeResults);

    helper.spinnerOpacity(0);
  } catch (err) {
    console.error(err);
    helper.spinnerOpacity(0);
  }
};

loadAndRenderTopAnime();


//? Funciton to implement smooth scrolling
const controlSmoothScrolling = function () {
  appear.header.scrollIntoView({ behavior: "smooth" });
}

const controlAddBookmar = function () {
  // 1.) Adding or removing bookmarks

  if (!model.state.anime.bookmarked) {
       model.addBookmark(model.state.anime);
  } else if(model.state.anime.bookmarked) {
    model.deleteBookmark(model.state.anime);
  }

  // 2.) Upadint our screen
  animeView.update(model.state.anime);
  handleAnimeName();

  // 3.) Rendering bookmarks
  bookmarkView.render(model.state.bookmark);
}


//? To handle
const controlBookmarkLoad = function(){
  bookmarkView.render(model.state.bookmark);
}

const init = function () {
  paginationView.addHandlerClick(controlPagination);
  animeView.addClickHandler(handleLinkClick);
  animeView.addHandlerAddBookmar(controlAddBookmar);
  resultsView.addClickHandler(controlAnime);
  //bookmarkView.addClickHandler(controlAnime);
  searchView.addHandlerSearch(controlSearchResults);
  appear.openModalAddClickHandler(controlModalView);
  appear.closeModalAddClickHandler(controlModalClosed);
  appear.implementSmoothScrolling(controlSmoothScrolling);
 // searchView.addHandleEmptySearch(loadAndRenderTopAnime);
 bookmarkView.addHandlerLoad(controlBookmarkLoad);
}

init();
