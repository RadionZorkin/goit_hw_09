export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const params = new URLSearchParams({
      q: this.searchQuery,
      pageSize: 5,
      page: this.page,
    });

    const options = {
      headers: {
        'X-Api-Key': 'c3b3833bf77e4bb7a9118a7ec13aee51',
      },
    };

    return fetch(`https://newsapi.org/v2/everything?${params}`, options)
      .then(response => response.json())
      .then(({ articles }) => {
        this.incrementPage();
        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
