//TODO: This is where all the dump code/comments or temp code lies

/* anime = {
  title: anime.title,
  year: anime.year,
  status: anime.status,
  popularity: anime.popularity,
  duration: anime.duration,
  episodes: anime.episodes,
  synopsis: anime.synopsis
} */


//! Main controlling js file.
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const animeSection = document.querySelector('.anime');
let linkName;

const showAnime = async function () {
  try {
    document.querySelector('.spinner').style.opacity = 1;
    document.body.addEventListener('click', handleLinkClick);

    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${linkName}&sfw`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${data.status})`);

    let anime = data.data[0];
    let getAnimeImage = anime.images.jpg.large_image_url;

    anime = {
      title_english: anime.title_english,
      year: anime.year,
      status: anime.status,
      popularity: anime.popularity,
      duration: anime.duration,
      episodes: anime.episodes,
      synopsis: anime.synopsis,
      title_japanese: anime.title_japanese,
      rank: anime.rank,
      rating: anime.rating,
      score: anime.score
    }

    document.querySelector('.spinner').style.opacity = 0;

    console.log(data.data[0]);

    const markup = `
            <a>
                <h2 class="title">${anime.title_english || 'N/A'}</h2>
            </a>

            <div class="upper_part anime_section">
                <img alt="Cover" class="image" src=${getAnimeImage}>
                <div class="right_part">
                    <div class="right_item">💚: <span>${anime.score || 'N/A'}</span></div>
                    <div class="right_item">Popularity: <span>${anime.popularity || 'N/A'}</span></div>
                    <div class="right_item">Rank: <span>${anime.rank || 'N/A'}</span></div>
                    <div class="right_item">Rating: <span>${anime.rating || 'N/A'}</span></div>
                </div>
            </div>

            <div class="btn_container">
                <button class="btn--round">💚</button>
                <button class="btn--round">🧲</button>
            </div>

            <div class="lower_part anime_section">
                <div class="lower_second_container">
                    <h3 class="down_heading">
                        <b>More</b>
                    </h3>
                    <div class="down_item"><span>Japanese Name:</span> ${anime.title_japanese || 'N/A'}</div>
                    <div class="down_item"><span>Year:</span> ${anime.year || 'N/A'}</div>
                    <div class="down_item"><span>Episodes:</span> ${anime.episodes || 'N/A'}</div>
                    <div class="down_item"><span>Duration:</span> ${anime.duration || 'N/A'}</div>
                </div>

                <div class="lower_second_container">
                    <h3 class="down_heading">
                        <b>Synopsis</b>
                    </h3>
                    <div class="syn">${anime.synopsis ? anime.synopsis + '!' : 'N/A'}</div>
                </div>
            </div>
        `;

    animeSection.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    // alert(err);
  }
};

showAnime();

function handleLinkClick(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    linkName = event.target.textContent;
    animeSection.innerHTML = ``;
    // Trigger the showAnime function again when a link is clicked
    showAnime();
  }
}

