import { API_URL } from "./config";
import { getJSON, timeout } from "./helpers";
import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";
import { RES_PER_PAGE } from "./config";

export const state = {
    anime: {},
    search: {
        results: [],
        query: '',
        resultsPerPage: 9,
        page: 1,
        topanimeResults: [],
    },
    bookmark: [],
};

export const loadAnime = async function (animeName) {
    try {
        const fetchPromise = await fetch(`${API_URL}${animeName}&sfw`);
        const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();
        let anime = data.data[0];

        state.anime = {
            title_english: anime.title_english || 'N/A',
            year: anime.year || 'N/A',
            status: anime.status || 'N/A',
            popularity: anime.popularity || 'N/A',
            duration: anime.duration || 'N/A',
            episodes: anime.episodes || 'N/A',
            synopsis: anime.synopsis || 'N/A',
            title_japanese: anime.title_japanese || 'N/A',
            rank: anime.rank || 'N/A',
            rating: anime.rating || 'N/A',
            score: anime.score || 'N/A',
            getAnimeImage: anime.images?.jpg?.large_image_url || 'N/A',
        };

        if(state.bookmark.some(bookmark => bookmark.title_english === anime.title_english))
            state.anime.bookmarked = true
        else state.anime.bookmarked = false

        // console.log(state.anime);
    } catch (err) {
        // console.error(err);
        // Handle the error as needed (e.g., notify the user)
    }
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Generic function for mapping anime data
const mapAnimeData = anime => {
    return {
        title_english: anime.title_english || 'N/A',
        getAnimeImage: anime.images?.jpg?.large_image_url || 'N/A',
        episodes: anime.episodes || 'N/A',
        popularity: anime.popularity || 'N/A',
        titleLength: anime.title_english ? anime.title_english.length : 0,
    };
};


//For search thingy
export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const fetchPromise = await fetch(`${API_URL}${query}&sfw`);
        const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

        const data = await response.json();

        state.search.results = data.data.map(mapAnimeData);

        // console.log(state.search.results);
    } catch (err) {
        //? Error handling
        console.error(err);
    }
};


// for welcome screen
export const topAnime = async function() {
    try {
        const fetchPromise = await fetch(`https://api.jikan.moe/v4/top/anime`);
        const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const data = await response.json();

        // Shuffle the results array
        const shuffledResults = shuffleArray(data.data);

        state.search.topanimeResults = shuffledResults.map(mapAnimeData);

    } catch (err) {
        console.error(err);
    }
};


// Generic function for getting pages
const getPages = function (data, page = state.search.page) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return data.slice(start, end);
};


//function for getting search result pages
export const getSearchResultPage = function (page = state.search.page) {
    return getPages(state.search.results, page);
};


//function for getting top anime pages
export const getTopAnimePages = function (page = state.search.page) {
    return getPages(state.search.topanimeResults, page);
};


//!  BOOKMARKS 

// To store bookmarks into localstorage
const persistentBookmarks = function(){
    localStorage.setItem('Bookmarks', JSON.stringify(state.bookmark));


}

export const addBookmark = function(anime){
    state.bookmark.push(anime);  

    if(anime.title_english === state.anime.title_english) state.anime.bookmarked = true;
    persistentBookmarks();
}

export const deleteBookmark = function(anime){
    //? Finding index of bookmark to remove that from bookmark array
    const index = state.bookmark.findIndex(el => el.title_english === anime.title_english);

    if (index !== -1) {
        state.bookmark.splice(index, 1);

        if (anime.title_english === state.anime.title_english) {
            state.anime.bookmarked = false;
        }
    }

    persistentBookmarks();
}


const init = function(){
    const storage = localStorage.getItem('Bookmarks');
    if (storage) state.bookmark = JSON.parse(storage);
}

init();
console.log(state.bookmark);