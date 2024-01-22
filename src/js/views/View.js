//! Parent class of 

export default class View {
    _data;
    _errorDiv = document.querySelector('.error');
    _search = document.querySelector('.search');

    render(data) {
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        // this._parentElement.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 4px 12px';
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

    update(data) {
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDom.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            if (
                !newEl.isEqualNode(curEl) &&
                newEl.firstChild?.nodeValue.trim() !== ''
            ) {
                curEl.textContent = newEl.textContent;
            }

            //? Update changed attribute
            if (!newEl.isEqualNode(curEl))
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
        });
    };

    errorHandling(errorMessage) {
        this._errorDiv.innerText = errorMessage;
        setTimeout(() => {
            this._errorDiv.style.opacity = 0;
            this._search.style.opacity = 1;
        }, 1690)

        this._errorDiv.style.opacity = 1;
        this._search.style.opacity = 0;
    }
};
