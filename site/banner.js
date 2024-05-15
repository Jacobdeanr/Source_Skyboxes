document.addEventListener("DOMContentLoaded", function () {
    const closeBannerButton = document.getElementById('close-banner');
    const banner = document.getElementById('banner');

    closeBannerButton.addEventListener('click', function () {
        banner.style.display = 'none';
        document.body.style.paddingTop = '0';
    });

    if (banner.style.display !== 'none') {
        document.body.style.paddingTop = banner.offsetHeight + 'px';
    }
});