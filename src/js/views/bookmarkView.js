import View from "./View.js";

class bookmarkView extends View {
    _parentElement = document.querySelector('.bookmarks__list');

    _generateMarkup() {
        this.answers = this._data;
        return this._data.map(this._generateMarkupPreview).join('');
    }


    _generateMarkupPreview(result) {
        return `
        <li class="bmPreview">
            <a class="preview__link bmPreview__link" href="" data-name="${result.title_english}">
                <figure class="bmPreview__fig">
                    <img src="${result.getAnimeImage}" alt="Test" />
                </figure>
                <div class="bmPreview__data">
                    <h4 class="bmPreview__name">
                        ${result.title_english}
                    </h4>
                    <p class="bmPreview__score"><b> score</b>: ${result.popularity}</p>
                </div>
            </a>
        </li>`
    }

    addHandlerLoad(handler){
        window.addEventListener('load', handler);
    }

    addClickHandler(handler) {
        this._parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.bmPreview');
            if (link) {
                const animeName = link.dataset.name;
                if (animeName) {
                    handler(animeName);
                }
            }
        });
    }

};


export default new bookmarkView();
