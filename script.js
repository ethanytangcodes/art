document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchResultTemplate = document.getElementById('searchResultTemplate').innerHTML;

  searchResults.innerHTML = 'Games are loading...';

  try {
    const data = await fetch('games.json').then(res => res.json());

    const renderSearchResults = (searchTerm = '') => {
      searchResults.innerHTML = '';

      const filteredResults = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const fragment = document.createDocumentFragment();

      filteredResults.forEach(result => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = searchResultTemplate.replace(/{{(.*?)}}/g, (match, key) => result[key.trim()]);
        fragment.appendChild(wrapper.firstElementChild);
      });

      searchResults.appendChild(fragment);
    };

    // initial render (all games)
    renderSearchResults();

    // debounce search input
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        renderSearchResults(searchInput.value.trim());
      }, 200); // delay in ms (200 = smooth typing)
    });
  } catch (err) {
    console.error('Error fetching data:', err);
    searchResults.innerHTML = 'Error loading games.';
  }
});
