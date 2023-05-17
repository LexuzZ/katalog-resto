/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import { itActsAsFavoriteMovieModel } from './contract/favoriteRestaurantContract';

let favoriteMovies = [];

const FavoriteMovieArray = {

  getMovie(id) {
    if (!id) {
      return;
    }

    return favoriteMovies.find((restaurant) => restaurant.id === id);
  },

  getAllMovies() {
    return favoriteMovies;
  },

  putMovie(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteMovies
    if (this.getMovie(restaurant.id)) {
      return;
    }

    favoriteMovies.push(restaurant);
  },

  deleteMovie(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteMovies = favoriteMovies.filter((restaurant) => restaurant.id !== id);
  },

  searchMovies(query) {
    return this.getAllMovies()
      .filter((restaurant) => {
        const loweredCaseMovieTitle = (restaurant.name || '-').toLowerCase();
        const jammedMovieTitle = loweredCaseMovieTitle.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedMovieTitle.indexOf(jammedQuery) !== -1;
      });
  },
};

describe('Favorite Movie Array Contract Test Implementation', () => {
  afterEach(() => favoriteMovies = []);

  itActsAsFavoriteMovieModel(FavoriteMovieArray);
});
