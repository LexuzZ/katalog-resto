import FavoriteIdb from '../../data/favorite-idb';
import FavoriteMovieSearchView from './liked-restaurant/favorite-movie-search-view';
import FavoriteMovieShowPresenter from './liked-restaurant/favorite-movie-show-presenter';
import FavoriteMovieSearchPresenter from './liked-restaurant/favorite-movie-search-presenter';

const view = new FavoriteMovieSearchView();

const Like = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteMovieShowPresenter({ view, favoriteRestaurant: FavoriteIdb });
    new FavoriteMovieSearchPresenter({ view, favoriteRestaurant: FavoriteIdb });
  },
};

export default Like;
