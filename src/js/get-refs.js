export default function () {
  return {
    cardContainer: document.querySelector('.js-card-container'),
    searchForm: document.querySelector('.js-search-form'),
    altSearchForm: document.querySelector('.alt-search-form'),
    articlesContainer: document.querySelector('.alt-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more-alt"]'),
  };
}
