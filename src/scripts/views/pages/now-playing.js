import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const NowPlaying = {
  async render() {
    return `
          <div class="content">
              <h2 class="content__heading">Daftar Restoran</h2>
              <div id="movies" class="movies">
              </div>
          </div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const restaurantsContainer = document.querySelector('#movies');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default NowPlaying;
