import { Notify } from 'notiflix/build/notiflix-notify-aio';
import elements from './refs';
import imagesApi from './fetch-services';
import render from './markupServices';
import ImagesApiService from './fetch-services';
// import lightbox from './simple-lightBox';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

elements.refs.searchForm.addEventListener('submit', onSubmitForm);
elements.refs.loadMoreBtn.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
// let valueInput = '';
const imagesApiService = new ImagesApiService();

async function onSubmitForm(e) {
  e.preventDefault();
  ishidenBtnLoadMore();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (imagesApiService.query === '') {
    return Notify.info('Please enter your search query');
  }
  console.log(imagesApiService.query);
  imagesApiService.resetPage();

  const images = await imagesApiService.getAllImages();
  if (images.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  clearGallery();
  await render.markupImages(images);
  Notify.success(`Hooray! We found ${imagesApiService.totalHits} images.`);
  shownBtnLoadMore();
  lightbox.refresh();
}

async function onLoadMore() {
  const moreImages = await imagesApiService.getAllImages();
  await render.markupImages(moreImages);
  lightbox.refresh();
  const searchCard = document.querySelectorAll('.photo-card');
  if (searchCard.length === imagesApiService.totalHits) {
    ishidenBtnLoadMore();
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  console.log(searchCard.length);
  console.log(imagesApiService.totalHits);
}

function clearGallery() {
  elements.refs.gallery.innerHTML = '';
}
function ishidenBtnLoadMore() {
  elements.refs.loadMoreBtn.classList.add('is-hidden');
}
function shownBtnLoadMore() {
  elements.refs.loadMoreBtn.classList.remove('is-hidden');
}

// async function onSubmitForm(e) {
//   e.preventDefault();
//   //   const valueInput = elements.refs.input.value;
//   const valueInput = e.currentTarget.elements.searchQuery.value;

//   const images = await imagesApi.getAllImages(valueInput);
//   if (images.length === 0) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
//   const markup = await render.markupImages(images);
//   return markup;
// }

// async function onLoadMore() {
//   const moreImages = await imagesApi.getAllImages(valueInput);
// }
