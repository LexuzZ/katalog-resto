/* eslint-disable import/named */
import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteMovieSearchView {
  getTemplate() {
    return `
      <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Movie</h2>
        <div id="restaurants" class="restaurants">
        </div>
      </div>
   `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showRestaurant(restaurants) {
    this.showFavoriteRestaurant(restaurants);
  }

  showFavoriteRestaurant(restaurants = []) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyMovieTemplate() {
    return '<div class="restaurants-item__not__found restaurants__not__found">Tidak ada restoran untuk ditampilkan</div>';
  }
}

export default FavoriteMovieSearchView;
