document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('skybox-container');
    const categories = {};

    function fetchCategories() {
        return fetch('categories.json')
            .then(response => response.json())
            .then(data => {
                Object.assign(categories, data);
            });
    }

    function fetchSkyboxes() {
        return fetch('https://api.github.com/repos/Jacobdeanr/Source_Skyboxes/contents')
            .then(response => response.json())
            .then(data => {
                return data.filter(item => item.type === 'file' && item.name.endsWith('.7z'));
            });
    }

    function displaySkyboxes(skyboxes, selectedTime, selectedWeather) {
        container.innerHTML = '';
        skyboxes.forEach(item => {
            const itemData = categories[item.name];
            if (!itemData) return;

            const hasSelectedTime = selectedTime ? itemData.categories.includes(selectedTime) : true;
            const hasSelectedWeather = selectedWeather ? itemData.categories.includes(selectedWeather) : true;

            if (hasSelectedTime && hasSelectedWeather) {
                const itemElement = document.createElement('div');
                itemElement.classList.add('skybox-item');

                const title = document.createElement('h3');
                title.textContent = item.name.replace('.7z', '');

                const img = document.createElement('img');
                img.src = `preview/${item.name.replace('.7z', '.jpg')}`;
                img.alt = item.name;

                const link = document.createElement('a');
                link.href = `#${item.name.replace('.7z', '')}`;
                link.textContent = 'View Details';

                itemElement.appendChild(title);
                itemElement.appendChild(img);
                itemElement.appendChild(link);

                container.appendChild(itemElement);
            }
        });
    }
    /*
	function create3DPreview(basePath) {
		const container = document.getElementById('preview-container');
		container.innerHTML = '';

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(90, container.clientWidth / container.clientHeight, 0.1, 1000);
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(container.clientWidth, container.clientHeight);
		container.appendChild(renderer.domElement);

		const urls = [
			`${basePath}/ft.jpg`,  // posz
			`${basePath}/bk.jpg`,  // negz
			`${basePath}/up.jpg`,  // posy
			`${basePath}/dn.jpg`,  // negy
			`${basePath}/rt.jpg`,  // posx
			`${basePath}/lf.jpg`   // negx
		];

		const loader = new THREE.CubeTextureLoader();
		const texture = loader.load(urls);

		scene.background = texture;

		camera.position.set(0, 0, 1);
		camera.rotation.order = 'YXZ'; // default is 'XYZ'
		

		let autoRotateAngle = 0;

		function animate() {
			requestAnimationFrame(animate);
			autoRotateAngle += 0.005; // Adjust this value to change rotation speed
			camera.rotation.x = 0.785398; //Radian value of 45 degrees rotation
			camera.rotation.y = autoRotateAngle;
			renderer.render(scene, camera);
		}
		
		

		window.addEventListener('resize', onWindowResize, false);

		function onWindowResize() {
			camera.aspect = container.clientWidth / container.clientHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.clientWidth, container.clientHeight);
		}

		animate();
		
		container.addEventListener('mousemove', (event) => {
			const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
			const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	
			camera.rotation.y = mouseX * Math.PI;
			camera.rotation.x = mouseY * Math.PI / 4;
		});
	}
	
    function fetchSkyboxDetails(name) {
        fetch('https://api.github.com/repos/Jacobdeanr/Source_Skyboxes/contents')
            .then(response => response.json())
            .then(data => {
                const item = data.find(item => item.name === `${name}.7z`);
                if (item) {
                    const detailsContainer = document.getElementById('details-container');
                    detailsContainer.innerHTML = '';

                    const title = document.createElement('h2');
                    title.textContent = item.name.replace('.7z', '');

                    const img = document.createElement('img');
                    img.src = `preview/${item.name.replace('.7z', '.jpg')}`;
                    img.alt = item.name;

                    const link = document.createElement('a');
                    link.href = item.download_url;
                    link.textContent = 'Download';

                    const description = document.createElement('p');
                    description.textContent = `File size: ${formatFileSize(item.size)}`;
					
                    //const previewContainer = document.createElement('div');
                    //previewContainer.id = 'preview-container';

                    detailsContainer.appendChild(title);
                    detailsContainer.appendChild(img);
                    //detailsContainer.appendChild(previewContainer);
                    detailsContainer.appendChild(description);
                    detailsContainer.appendChild(link);

                    document.getElementById('skybox-container').style.display = 'none';
                    detailsContainer.style.display = 'block';

                    //create3DPreview(`Thumbnails/${item.name.replace('.7z', '')}`);
                }
            })
            .catch(error => console.error('Error fetching the repository contents:', error));
    }*/

    function fetchSkyboxDetails(name) {
        fetch('https://api.github.com/repos/Jacobdeanr/Source_Skyboxes/contents')
            .then(response => response.json())
            .then(data => {
                const item = data.find(item => item.name === `${name}.7z`);
                const itemData = categories[`${name}.7z`];
                if (item && itemData) {
                    const detailsContainer = document.getElementById('details-container');
                    detailsContainer.innerHTML = '';
    
                    const title = document.createElement('h2');
                    title.textContent = item.name.replace('.7z', '');
    
                    const img = document.createElement('img');
                    img.src = `preview/${item.name.replace('.7z', '.jpg')}`;
                    img.alt = item.name;
    
                    const link = document.createElement('a');
                    link.href = item.download_url;
                    link.textContent = 'Download';
    
                    const fileSize = document.createElement('p');
                    fileSize.textContent = `File size: ${formatFileSize(item.size)}`;
    
                    const author = document.createElement('p');
                    author.textContent = `Author: ${itemData.author}`;
    
                    const description = document.createElement('p');
                    description.textContent = `Description: ${itemData.description}`;
                    
                    //Shenanigans to get the text color to appear right.
                    const brightnessColor = `rgb(${itemData.sunParameters.brightness.slice(0, 3).join(', ')})`;
                    const ambienceColor = `rgb(${itemData.sunParameters.ambience.slice(0, 3).join(', ')})`;
                    const fogPrimaryColor = `rgb(${itemData.fogParameters.primaryFogColor.join(', ')})`;
                    const fogSecondaryColor = `rgb(${itemData.fogParameters.secondaryFogColor.join(', ')})`;
    
                    const brightnessTextColor = getTextColor(itemData.sunParameters.brightness.slice(0, 3));
                    const ambienceTextColor = getTextColor(itemData.sunParameters.ambience.slice(0, 3));
                    const primaryFogTextColor = getTextColor(itemData.fogParameters.primaryFogColor);
                    const secondaryFogTextColor = getTextColor(itemData.fogParameters.secondaryFogColor);
                    
                    //License
                    const license = document.createElement('p');
                    license.id = "license-info"
                    license.innerHTML = `License: <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
                    Creative Commons Attribution 4.0 International (CC BY 4.0)</a>`;
    
                    console.log(brightnessColor);
                    console.log(primaryFogTextColor);
    
                    const envParameters = `
                        <tr>
                            <td>${itemData.sunParameters.sunAngle}</td>
                            <td>${itemData.sunParameters.pitch}</td>
                            <td style="background-color: ${brightnessColor}; color: ${brightnessTextColor};">${itemData.sunParameters.brightness.join(' ')}</td>
                            <td style="background-color: ${ambienceColor}; color: ${ambienceTextColor};">${itemData.sunParameters.ambience.join(' ')}</td>
                            <td style="background-color: ${fogPrimaryColor}; color: ${primaryFogTextColor};">${itemData.fogParameters.primaryFogColor.join(' ')}</td>
                            </tr>`;
                            
                            //<td style="background-color: ${fogSecondaryColor}; color: ${secondaryFogTextColor};">${itemData.fogParameters.secondaryFogColor.join(' ')}</td>
                    const detailsTable = `
                        <table>
                            <tr>
                                <th>Sun Angle</th>
                                <th>Pitch</th>
                                <th>Brightness</th>
                                <th>Ambient</th>
                                <th>Primary Fog Color</th>
                                
                            </tr>
                            ${envParameters}
                        </table>`;
                            //<th>Secondary Fog Color</th>
    
                    detailsContainer.appendChild(title);
                    detailsContainer.appendChild(img);
                    detailsContainer.innerHTML += detailsTable; // Adding table as HTML string
                    detailsContainer.appendChild(author);if (itemData.description.trim() !== "") {
                        detailsContainer.appendChild(description);
                    }
                    detailsContainer.appendChild(fileSize);
                    detailsContainer.appendChild(license);
                    detailsContainer.appendChild(link);
    
                    document.getElementById('skybox-container').style.display = 'none';
                    detailsContainer.style.display = 'block';
                }
            })
            .catch(error => console.error('Error fetching the repository contents:', error));
    }
    

    function formatFileSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    }

    function getTextColor(rgbArray) {
        const [r, g, b] = rgbArray;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        console.log(luminance)
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }

    function router() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            fetchSkyboxDetails(hash);
        } else {
            document.getElementById('skybox-container').style.display = 'flex';
            document.getElementById('details-container').style.display = 'none';
        }
    }

    function init() {
        fetchCategories().then(() => {
            return fetchSkyboxes();
        }).then(skyboxes => {
            const timeSelect = document.getElementById('time-select');
            const weatherSelect = document.getElementById('weather-select');

            const updateDisplay = () => {
                const selectedTime = timeSelect.value;
                const selectedWeather = weatherSelect.value;
                displaySkyboxes(skyboxes, selectedTime, selectedWeather);
            };

            timeSelect.addEventListener('change', updateDisplay);
            weatherSelect.addEventListener('change', updateDisplay);

            updateDisplay();
        });

        window.addEventListener('hashchange', router);
        window.addEventListener('load', router);
    }

    init();
});
