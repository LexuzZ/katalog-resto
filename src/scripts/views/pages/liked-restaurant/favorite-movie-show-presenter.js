class FavoriteMovieShowPresenter {
  constructor({ view, favoriteRestaurant }) {
    this._view = view;
    this._favoriteRestaurant = favoriteRestaurant;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const restaurants = await this._favoriteRestaurant.getAllRestaurant();
    this._displayRestaurant(restaurants);
  }

  _displayRestaurant(restaurants) {
    this._view.showFavoriteRestaurant(restaurants);
  }
}

export default FavoriteMovieShowPresenter;
