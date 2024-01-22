//! This js files includes all the additional features to make the page sexier

//? Selecting required elements
export const modal = document.querySelector('.modal');
export const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.btn--show-modal');
const btnSubmit = document.querySelector('.btn--signup-modal');

export const openModalAddClickHandler = function (handler) {
    btnOpenModal.addEventListener('click', () => {
        // e.preventDefault();
        handler();
    })
}


export const closeModalAddClickHandler = function (handler) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !modal.classList.contains('hidden')) {
            handler();
        }
    })

    if (modal.classList.contains('hidden')) {
        btnSubmit.addEventListener('click', function (e) {
            handler();
        })
    }

    btnCloseModal.addEventListener('click', function () {
        handler();
    })
}


export const removingPagesButton = function () {
    const prevBtn = document.querySelector('.pagination__btn--prev');
    const nextBtn = document.querySelector('.pagination__btn--next');
    
    prevBtn?.remove();
    nextBtn?.remove();
}


//? Implementing smooth scrolling
const aTag = document.querySelector('a');
export const header = document.querySelector('header');

export const implementSmoothScrolling = function(handler){
    document.addEventListener('click', function(e){
        if(e.target.closest('a')){
            // console.log(e.target);
            handler();
        }
    })
}