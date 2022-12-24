import { Notify } from 'notiflix/build/notiflix-notify-aio';
import elements from './refs';
import render from './markup-services';
import ImagesApiService from './fetch-services';
import simpleLightbox from './simple-lightBox';
import smoothScrolling from './smooth-scrol';

elements.refs.searchForm.addEventListener('submit', onSubmitForm);
elements.refs.loadMoreBtn.addEventListener('click', onLoadMore);

simpleLightbox.lightbox;

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
  if (images.length > 0) {
    Notify.success(`Hooray! We found ${imagesApiService.totalHits} images.`);
  }
  if (images.length >= 40) {
    shownBtnLoadMore();
  }
  simpleLightbox.refresh();
  smoothScrolling();
}

async function onLoadMore() {
  const moreImages = await imagesApiService.getAllImages();
  await render.markupImages(moreImages);
  simpleLightbox.refresh();
  const searchCard = document.querySelectorAll('.photo-card');
  if (searchCard.length === imagesApiService.totalHits) {
    ishidenBtnLoadMore();
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
  console.log(searchCard.length);
  console.log(imagesApiService.totalHits);
  smoothScrolling();
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
