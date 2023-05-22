/* eslint-disable no-undef */
import { itActsAsFavoriteMovieModel } from './contract/favoriteRestaurantContract';
import FavoriteIdb from '../src/scripts/data/favorite-idb';

describe('Favorite restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteIdb.getAllRestaurant()).forEach(async (restaurant) => {
      await FavoriteIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteIdb);
});
