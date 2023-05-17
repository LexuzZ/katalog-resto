/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const assert = require('assert');

Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('test something', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
});

Scenario('liking one movie', async (I) => {
    I.see('Tidak ada film untuk ditampilkan', '.movie-item__not__found');
  
    I.amOnPage('/');
  
    I.seeElement('.movie__title a');
    const firstFilm = locate('.movie__title a').first();
  const firstFilmTitle = await I.grabTextFrom(firstFilm);
  I.click(firstFilm);
  
    I.seeElement('#likeButton');
    I.click('#likeButton');
  
    I.amOnPage('/#/like');
    I.seeElement('.movie-item');
    const likedFilmTitle = await I.grabTextFrom('.movie__title');

  assert.strictEqual(firstFilmTitle, likedFilmTitle);
  });