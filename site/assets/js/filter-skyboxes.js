
document.addEventListener('DOMContentLoaded', function () {
    const timeSelect = document.getElementById('time-select');
    const weatherSelect = document.getElementById('weather-select');
    const skyboxItems = document.querySelectorAll('.skybox-item');

    function filterSkyboxes() {
        const selectedTime = timeSelect.value;
        const selectedWeather = weatherSelect.value;

        skyboxItems.forEach(item => {
            const categories = item.getAttribute('data-categories').split(',');

            const matchesTime = selectedTime === '' || categories.includes(selectedTime);
            const matchesWeather = selectedWeather === '' || categories.includes(selectedWeather);

            if (matchesTime && matchesWeather) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    timeSelect.addEventListener('change', filterSkyboxes);
    weatherSelect.addEventListener('change', filterSkyboxes);

    filterSkyboxes();
});
