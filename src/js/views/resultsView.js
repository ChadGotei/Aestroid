import View from "./View.js";

class resultView extends View {
    _parentElement = document.querySelector('.results');
    _animeTitle = document.querySelector('.title');
    answers = [];

    _generateMarkup() {
        // console.log(this._data);
        this.answers = this._data;
        return this._data.map(this._generateMarkupPreview).join('');
    }


    _generateMarkupPreview(result) {
        return `
        <li class="preview" style="box-shadow: none;">
        <a class="preview__link preview__link--active" href="" data-name="${result.title_english}">
                    <figure class="preview__fig">
                        <img src=${result.getAnimeImage} alt="Test" />
                        <div class="preview__data">
                        <h4 class="preview__title">${result.title_english || 'N/A'}</h4>
                        <div class="rank">Rank  <span>: ${result.popularity || 'N/A'}</span></div>
                        </div>
                    </figure>
                </a>
            </li>
        `
    }

    addClickHandler(handler) {
        this._parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.preview');
            if (link) {
                const animeName = link.dataset.name;
                /*  if (animeName === 'N/A') {
                     // ? Error handling here
                     this._errorHandling('Not much information available');
                     return;
                 } */
                if (animeName) {
                    handler(animeName);
                }
            }
        });
    }

};


export default new resultView();
