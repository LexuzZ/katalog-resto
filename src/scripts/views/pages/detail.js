import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
        <div id="movie" class="movie">Detail Page</div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    console.log(restaurant);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
  },
};

export default Detail;
