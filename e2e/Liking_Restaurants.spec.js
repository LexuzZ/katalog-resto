/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const assert = require('assert');

Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  // I.seeElement('#query');
  // I.seeElement('.query'); // membuat test menjadi gagal
  I.see('Tidak ada restoran untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.waitForElement('.restaurant__title a', 10);
  I.seeElement('.restaurant__title a');

  const firstFilm = locate('.restaurant__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilm);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');

  I.seeElement('.movie-item');
  const likedFilmTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstFilmTitle, likedFilmTitle);
});
Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/like');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurant = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.movie-item');
  assert.strictEqual(matchingRestaurant.length, visibleLikedRestaurant);

  matchingRestaurant.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});
