import instanceAPI from './api';
// const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32149613-f346d44487708b1f8ebf92444';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = '';
  }
  async getAllImages() {
    // console.log(this);
    try {
      const res = await instanceAPI.get(
        `?per_page=40&key=${API_KEY}&q=${this.searchQuery}&image_type=photo
        &orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      const arrayImages = res.data.hits;
      console.log(arrayImages.length);
      this.totalHits = res.data.totalHits;
      this.incrementPage();
      // console.log(this);

      return arrayImages;
    } catch (error) {
      console.log(error);
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
