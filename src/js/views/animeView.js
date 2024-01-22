//? animeView.js

import View from "./View.js";
import icons from '../../img/icons.svg';

class AnimeView extends View {
  _parentElement = document.querySelector('.anime');

  addClickHandler(handler) {
    document.body.addEventListener('click', handler);
  }

  addHandlerAddBookmar(handler){
    document.body.addEventListener('click', function(e){
      const btn = e.target.closest('.btn--bookmark');
      if(!btn) return;
      handler();
    })
  }

  _generateMarkup() {
    return `
      <a>
        <h2 class="title">${this._data.title_english || 'N/A'}</h2>
      </a>

      <div class="upper_part anime_section">
        <img alt="Cover" class="image" src=${this._data.getAnimeImage || 'N/A'}>
        <div class="right_part">
          <div class="right_item">💚: <span>${this._data.score || 'N/A'}</span></div>
          <div class="right_item">Popularity: <span>${this._data.popularity || 'N/A'}</span></div>
          <div class="right_item">Rank: <span>${this._data.rank || 'N/A'}</span></div>
          <div class="right_item">Rating: <span>${this._data.rating || 'N/A'}</span></div>
        </div>
      </div>

      <div class="btn_container">
        <button class="btn--round">💚</button>
        <button class="btn--round btn--bookmark">
        <svg class="nav__icon">
        <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
        </svg></button>
      </div>

      <div class="lower_part anime_section">
        <div class="lower_second_container">
          <h3 class="down_heading">
            <b>More</b>
          </h3>
          <div class="down_item"><span>Japanese Name:</span> ${this._data.title_japanese || 'N/A'}</div>
          <div class="down_item"><span>Year:</span> ${this._data.year || 'N/A'}</div>
          <div class="down_item"><span>Episodes:</span> ${this._data.episodes || 'N/A'}</div>
          <div class="down_item"><span>Duration:</span> ${this._data.duration || 'N/A'}</div>
        </div>

        <div class="lower_second_container">
          <h3 class="down_heading">
            <b>Synopsis</b>
          </h3>
          <div class="syn">${this._data.synopsis ? this._data.synopsis + '!' : 'N/A'}</div>
        </div>
      </div>
    `;
  }
}

export default new AnimeView();
