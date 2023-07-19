const accessKey = 'https://unsplash.com/'; // Replace with your Unsplash access key
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const pictureGallery = document.getElementById('pictureGallery');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        searchPictures(searchTerm);
    }
});

async function searchPictures(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`);
        const data = await response.json();
        displayPictures(data.results);
    } catch (error) {
        console.error('Error fetching pictures:', error);
    }
}

function displayPictures(pictures) {
    pictureGallery.innerHTML = '';

    pictures.forEach((picture) => {
        const pictureItem = document.createElement('div');
        pictureItem.classList.add('picture-item');

        const image = document.createElement('img');
        image.classList.add('picture');
        image.src = picture.urls.regular;
        image.alt = picture.alt_description;

        const pictureInfo = document.createElement('div');
        pictureInfo.classList.add('picture-info');
        pictureInfo.innerHTML = `
            <p>By: <a href="${picture.user.links.html}" target="_blank">${picture.user.name}</a></p>
            <p>Description: ${picture.description || 'N/A'}</p>
            <p>View on <a href="${picture.links.html}" target="_blank">Unsplash</a></p>
        `;

        pictureItem.appendChild(image);
        pictureItem.appendChild(pictureInfo);

        pictureGallery.appendChild(pictureItem);
    });
}