import {galleryItems} from './gallery_array';

const galleryContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalImg = document.querySelector(".lightbox__image");
const btnClose = document.querySelector('.lightbox__button');
const cardsMarkup = (createGalleryItems(galleryItems));
const galleryOverlay = document.querySelector('.lightbox__overlay')

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', onGalleryContainerClick);
btnClose.addEventListener('click', modalClose);
galleryOverlay.addEventListener('click', onOverlayClick);
window.addEventListener('keypress', onEscPress);

function createGalleryItems(items) {
  return galleryItems.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>
  `
  }).join('');
};

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if(evt.target.nodeName === "IMG") {
    modalWindow.classList.add('is-open');
    modalImg.src = evt.target.dataset.source;
    modalImg.alt = evt.target.alt;
  }
};

function modalClose(evt) {
  modalWindow.classList.remove('is-open');
  modalImg.removeAttribute("src");
  modalImg.removeAttribute("alt");
};

function onOverlayClick(evt) {
if(evt.currentTarget === evt.target) {
  modalClose();
}
};

function onEscPress(evt) {
  if(evt.code === "Escape") {
    modalClose();
	}
};