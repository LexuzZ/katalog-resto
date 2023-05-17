/* eslint-disable no-undef */
import { itActsAsFavoriteMovieModel } from './contract/favoriteRestaurantContract';
import FavoriteMovieIdb from '../src/scripts/data/favorite-idb';

describe('Favorite Movie Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteMovieIdb.getAllMovies()).forEach(async (movie) => {
      await FavoriteMovieIdb.deleteMovie(movie.id);
    });
  });

  itActsAsFavoriteMovieModel(FavoriteMovieIdb);
});
