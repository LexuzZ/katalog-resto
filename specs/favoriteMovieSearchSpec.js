/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import FavoriteMovieSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-movie-search-presenter';
import FavoriteIdb from '../src/scripts/data/favorite-idb';
import FavoriteMovieSearchView
  from '../src/scripts/views/pages/liked-restaurant/favorite-movie-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurant;
  let view;

  const searchRestaurant = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteMovieSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteIdb);
    presenter = new FavoriteMovieSearchPresenter({
      favoriteRestaurant,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurant('film a');

      expect(presenter.latestQuery)
        .toEqual('film a');
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurant('film a');

      expect(favoriteRestaurant.searchRestaurant)
        .toHaveBeenCalledWith('film a');
    });

    it('should show the found restaurants', () => {
      presenter._showFoundRestaurant([{ id: 1 }]);
      expect(document.querySelectorAll('.restaurant-item').length)
        .toEqual(1);

      presenter._showFoundRestaurant([{
        id: 1,
        name: 'Satu',
      }, {
        id: 2,
        name: 'Dua',
      }]);
      expect(document.querySelectorAll('.restaurant-item').length)
        .toEqual(2);
    });

    it('should show the title of the found restaurants', () => {
      presenter._showFoundRestaurant([{
        id: 1,
        name: 'Satu',
      }]);
      expect(document.querySelectorAll('.restaurant__title')
        .item(0).textContent)
        .toEqual('Satu');
    });

    it('should show - when the restaurant returned does not contain a title', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantTitles = document.querySelectorAll('.restaurant__title');
        expect(restaurantTitles.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurant('film a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurant(' ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurant('    ');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurant('');
      expect(presenter.latestQuery.length)
        .toEqual(0);

      searchRestaurant('\t');
      expect(presenter.latestQuery.length)
        .toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurant('    ');

      expect(favoriteRestaurant.getAllRestaurant)
        .toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a').and.returnValues([]);

      searchRestaurant('film a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length)
          .toEqual(0);
        done();
      });

      favoriteRestaurant.searchRestaurant.withArgs('film a')
        .and
        .returnValues([]);

      searchRestaurant('film a');
    });
  });
});
