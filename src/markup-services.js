import elements from './refs';

function markupImages(cards) {
  //   elements.refs.gallery.innerHTML = '';
  const markupImages = cards
    .map(
      card => `<div class="photo-card">
      <a href="${card.largeImageURL}">
      <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
      </a>
    <div class="info">
    <p class="info-item">
      <b>Likes:</b>${card.likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${card.views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${card.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
  elements.refs.gallery.insertAdjacentHTML('beforeend', markupImages);
}

export default { markupImages };
