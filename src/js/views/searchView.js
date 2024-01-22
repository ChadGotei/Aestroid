//! class searchView 
import View from './View.js';

class SearchView extends View {
    _parentElement = document.querySelector('.search');

    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handler();
        });
    }

    addHandleEmptySearch(handler) {
        if (!this.getQuery()) {
            this._parentElement.addEventListener('submit', function (e) {
                e.preventDefault();
                handler();
            })
        }
    }
}

export default new SearchView();
