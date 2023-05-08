import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="movie__title">${restaurant.name}</h2>
  <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL}${restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="movie__info">
    <h3>Information</h3>
    <h4>Nama Restaurant</h4>
    <p>${restaurant.name}</p>
    <h4>Alamat</h4>
    <p>${restaurant.address}</p>
    <h4>Kota</h4>
    <p>${restaurant.city}</p>
    <h4> Ciri Khas </h4>
    <p> ${restaurant.categories.map((category) => `${category.name}`)}</p>
    <h4> Makanan : </h4>
    <p>${restaurant.menus.foods.map((food) => `<em>${food.name}</em>`)}</p>
    <h4> Minuman : </h4>
    <p>${restaurant.menus.drinks.map((drink) => `<em>${drink.name}</em>`)}</p>
    <h4>Deskripsi</h4>
    <p>${restaurant.description}</p>
  </div>
  <div class="movie__overview">
    <h3>Overview</h3>
    ${restaurant.customerReviews.map((review) => `<p>${review.date}</p> <p>${review.name}</p> <p>${review.review}</p>`)}
  </div>
`;

const createRestaurantItemTemplate = (restaurants) => `
  <div class="movie-item">
    <div class="movie-item__header">
      <img class="movie-item__header__poster" alt="${restaurants.name}"
           src="${CONFIG.BASE_IMAGE_URL}${restaurants.pictureId}">
      <div class="movie-item__header__rating">
        <p>⭐️<span class="movie-item__header__rating__score">${restaurants.rating}</span></p>
      </div>
    </div>
    <div class="movie-item__content">
      <h3><a href="/#/detail/${restaurants.id}">${restaurants.name}</a></h3>
      <p>${restaurants.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
