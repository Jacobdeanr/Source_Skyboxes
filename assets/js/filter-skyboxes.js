document.addEventListener('DOMContentLoaded', () => {
    const timeSelect = document.getElementById('time-select');
    const weatherSelect = document.getElementById('weather-select');
    const sortSelect = document.getElementById('sort-select');
    const skyboxContainer = document.getElementById('skybox-container');
    const skyboxItems = Array.from(skyboxContainer.getElementsByClassName('skybox-item'));
  
    function filterItems() {
      const time = timeSelect.value.toLowerCase();
      const weather = weatherSelect.value.toLowerCase();
  
      skyboxItems.forEach(item => {
        const categories = item.getAttribute('data-categories').toLowerCase();
        const matchesTime = time === "" || categories.includes(time);
        const matchesWeather = weather === "" || categories.includes(weather);
        item.style.display = matchesTime && matchesWeather ? "block" : "none";
      });
    }
  
    function sortItems() {
      const sortBy = sortSelect.value;
      const sortedItems = skyboxItems.sort((a, b) => {
        if (sortBy === 'name') {
          return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        } else if (sortBy === 'date') {
          return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
        }
      });
  
      sortedItems.forEach(item => skyboxContainer.appendChild(item));
    }
  
    timeSelect.addEventListener('change', filterItems);
    weatherSelect.addEventListener('change', filterItems);
    sortSelect.addEventListener('change', sortItems);
  });
  