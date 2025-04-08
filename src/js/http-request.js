import pokemonCardTpl from '../templates/pokemon-card.hbs';
import articlesCardTpl from '../templates/articles.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './api-service.js';
import getRefs from './get-refs.js';
import NewsApiService from '../js/news-service.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadMoreBtn from '../js/components/load-more-btn.js';

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const searchQuery = form.query.value;

  API.fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
    .finally(() => {
      form.reset();
    });
}

function renderPokemonCard(pokemon) {
  const markup = pokemonCardTpl(pokemon);
  refs.cardContainer.innerHTML = markup;
}

function onFetchError() {
  Notify.failure('Упс, щось пішло не так і ми не знайшли вашого покемона!');
}

// ==================================

// pokemon?limit=100000&offset=0.
// const params = new URLSearchParams({
//   q: 'Apple',
//   sortBy: 'popularity',
// });
// const url = `https://newsapi.org/v2/everything?${params}`;
// console.log(url);
// const options = {
//   headers: { 'X-Api-Key': 'c3b3833bf77e4bb7a9118a7ec13aee51' },
// };

// fetch(url, options)
//   .then(r => r.json())
//   .then(console.log);

// c3b3833bf77e4bb7a9118a7ec13aee51
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more-alt"]',
  hidden: true,
});

refs.altSearchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

loadMoreBtn.enable();

const newsApiService = new NewsApiService();

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.altQuery.value;

  if (newsApiService.query === '') {
    alert('Введи щось в поле пошуку!');
  } else {
    loadMoreBtn.show();
    newsApiService.resetPage();
    fetchArticles();
    clearArticlesContuiner();
  }
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML(
    'beforeend',
    articlesCardTpl(articles)
  );
}

function clearArticlesContuiner() {
  refs.articlesContainer.innerHTML = '';
}
