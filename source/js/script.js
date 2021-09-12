'use strict';

const ENTER_BUTTON = `Enter`;
const openButton = document.querySelector(`.start-page__button`);
const hiddenPopup = document.querySelector(`.hidden`)
const popupField = document.querySelector(`.popup`);
const popup = popupField.querySelector(`.popup__wrapper`);
const closeButton = popup.querySelector(`.popup__close-button`);
const cancel = popup.querySelector(`.popup__resolution-button`);
const uninstall = popup.querySelector(`.popup__resolution-button--red`);


const openPopup = () => {
    hiddenPopup.classList.remove(`hidden`);
};

const closePopup = () => {
    popupField.classList.add(`hidden`);
};

const uninstallApp = () => {
    closePopup();
    alert(`DONE`);
};

openButton.addEventListener(`click`, openPopup);
openButton.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER_BUTTON) {
        openPopup();
    }
});

closeButton.addEventListener(`click`, closePopup);
closeButton.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER_BUTTON) {
        closePopup();
    }
});

cancel.addEventListener(`click`, closePopup);
cancel.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER_BUTTON) {
        closePopup();
    }
});

uninstall.addEventListener(`click`, uninstallApp);
uninstall.addEventListener(`keydown`, (evt) => {
    if (evt.key === ENTER_BUTTON) {
        uninstallApp();
    }
});

popupField.addEventListener(`click`, (evt) => {
    if (evt.target !== popup && evt.target.classList.value && !evt.target.classList.value.match(/popup__/)) {
        closePopup();
    }
});
