import elements from './refs';

function smoothScrolling() {
  const { height: cardHeight } =
    elements.refs.gallery.firstElementChild.getBoundingClientRect();

  // console.log(cardHeight);

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export default smoothScrolling;
