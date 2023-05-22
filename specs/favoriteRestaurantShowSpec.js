/* eslint-disable no-undef */
import FavoriteMovieSearchView
  from '../src/scripts/views/pages/liked-restaurant/favorite-movie-search-view';
import FavoriteMovieShowPresenter
  from '../src/scripts/views/pages/liked-restaurant/favorite-movie-show-presenter';
import FavoriteIdb from '../src/scripts/data/favorite-idb';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should ask for the favorite restaurant', () => {
      const favoriteRestaurant = spyOnAllFunctions(FavoriteIdb);

      new FavoriteMovieShowPresenter({
        view,
        favoriteRestaurant,
      });

      expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurant have been liked', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.movie-item__not__found').length)
          .toEqual(1);

        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteIdb);
      favoriteRestaurant.getAllRestaurant.and.returnValues([]);

      new FavoriteMovieShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });

  describe('When favorite restaurant exist', () => {
    it('should show the restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.movie-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurant = spyOnAllFunctions(FavoriteIdb);
      favoriteRestaurant.getAllRestaurant.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, description: 'Sebuah film A',
        },
        {
          id: 22, name: 'B', rating: 4, description: 'Sebuah film B',
        },
      ]);

      new FavoriteMovieShowPresenter({
        view,
        favoriteRestaurant,
      });
    });
  });
});
