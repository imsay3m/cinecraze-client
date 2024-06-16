const movieDetails = () => {
    const params = getParams();
    const tmdb_id = params.get('tmdb_id')
    if (tmdb_id == null) {
        window.location.href = "index.html";
    }
    const movie_api = `https://cinecraze-server.onrender.com/api/movies/?tmdb_id=${tmdb_id}`;
    fetch(movie_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            const element = data[0];
            console.log(element);
            const demo = document.getElementById('demo-build')
            demo.classList.remove('flex');
            demo.classList.add('hidden');
            demo.innerHTML = ''
            const downloadUrls = element.download_urls.map(key => `
                <tr>
                    <td class="text-primary"><a href=${key.download_url} target="_blank" rel="noopener noreferrer">Download</a></td>
                    <td><button class="text-left text-white px-2 py-1.5 bg-tertiary border border-[#262626] rounded-md">${key.quality}</button></td>
                    <td>${key.language}</td>
                    <td>${key.size}</td>
                </tr>`).join('');

            const genres = element.genres.map(key => `
                <button class="text-left text-white px-3 py-2.5 bg-tertiary border border-[#262626] rounded-md">
                    ${key}
                </button>`).join('');

            const cast = element.casts.map(member => `
                <div class="w-21 lg:w-22">
                    <img class="rounded-lg" src="${member.profile_path}" alt="${member.name}">
                    <p>${member.name}</p>
                </div>`).join('');
            const languages = element.languages.map(language => `
                <button class="text-left text-white px-3 py-2.5 bg-tertiary border border-[#262626] rounded-md">
                    ${language}
                </button>`).join('');
            const release_date = convertDate(element.release_date);
            const parent_div = document.querySelector('#movie-details-container');
            parent_div.classList.remove('hidden');
            const child_div = document.createElement('div');
            child_div.classList.add('w-80', 'lg:w-[1280px]', 'mx-auto', 'my-20', 'lg:my-25', 'flex', 'flex-col', 'lg:flex-row', 'gap-y-5', 'lg:gap-x-5');
            child_div.innerHTML = `
            <div class="flex flex-col gap-y-5">
                    <div
                        class="self-start text-sm lg:text-base font-medium p-6 lg:p-10 bg-secondery rounded-[10px] border border-[#262626]">
                        <h6 class="text-[#999999] mb-2 lg:mb-2.5">Description</h6>
                        <p class="text-white">${element.overview}</p>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-y-5 lg:gap-x-5">
                        <div
                            class="w-80 lg:w-auto self-start text-sm lg:text-base font-medium p-6 lg:p-10 bg-secondery rounded-[10px] border border-[#262626]">
                            <h6 class="text-[#999999] mb-2 lg:mb-2.5">Links</h6>
                            <div>
                                <div class="overflow-x-auto min-h-56 lg:h-92.5">
                                    <table
                                        class="table table-xs lg:table-md table-zebra table-zebra-zebra table-pin-rows table-pin-cols">
                                        <thead>
                                            <tr class="bg-seconderylite text-white lg:font-bold text-sm">
                                                <td>Download</td>
                                                <td>Quality</td>
                                                <td>Language</td>
                                                <td>Size</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        ${downloadUrls}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div
                            class="w-80 lg:w-auto text-sm lg:text-base font-medium p-6 lg:p-10 bg-secondery rounded-[10px] border border-[#262626]">
                            <h6 class="text-[#999999] mb-2 lg:mb-2.5">Cast</h6>
                            <div class="flex flex-wrap lg:flex-row gap-x-2 lg:gap-x-1 lg:gap-y-1">
                                ${cast}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="w-80 flex flex-col justify-start items-start gap-y-5 text-sm lg:text-base font-medium p-6 lg:p-10 bg-secondery rounded-[10px] border border-[#262626]">
                    <div>
                        <div class="flex justify-start items-center gap-x-1 mb-2 lg:mb-2.5">
                            <img src="assets/images/movie-details/released-year-icon.png" alt="">
                            <h6 class="text-[#999999]">Released Date</h6>
                        </div>
                        <p class="text-white">${release_date}</p>
                    </div>
                    <div>
                        <div class="flex justify-start items-center flex-wrap gap-x-1 mb-2 lg:mb-2.5">
                            <img src="assets/images/movie-details/languages-icon.png" alt="">
                            <h6 class="text-[#999999]">Available Languages</h6>
                        </div>
                        <div class="flex flex-wrap justify-start items-center gap-2.5">
                            ${languages}
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-start items-center flex-wrap gap-x-1 mb-2 lg:mb-2.5">
                            <img src="assets/images/movie-details/star-not-filled-icon.png" alt="">
                            <h6 class="text-[#999999]">Ratings</h6>
                        </div>
                        <div class="flex justify-start items-center gap-2.5">
                            <button
                                class="text-left text-white px-3 py-2.5 bg-tertiary border border-[#262626] rounded-md">
                                IMDB<br>${element.imdb_rating}
                            </button>
                            <button
                                class="text-left text-white px-3 py-2.5 bg-tertiary border border-[#262626] rounded-md">
                                CINECRAZE <br>${element.imdb_rating}
                            </button>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-row justify-start items-center flex-wrap gap-1 mb-2 lg:mb-2.5">
                            <img src="assets/images/movie-details/genres-icon.png" alt="">
                            <h6 class="text-[#999999]">Genres</h6>
                        </div>
                        <div class="flex flex-wrap justify-start items-center gap-2.5">
                            ${genres}
                        </div>
                    </div>
                    <div>
                        <h6 class="text-[#999999] mb-2 lg:mb-2.5">Director</h6>
                        <div class="flex justify-start items-center gap-2.5">
                            <div
                                class="w-64 flex justify-start items-center gap-x-3 text-left text-white p-3 bg-tertiary border border-[#262626] rounded-md">
                                <img class="w-12.5" src=${element.director.profile_path} alt="">
                                <p>${element.director.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `
            parent_div.appendChild(child_div);
        })
}
window.onload = movieDetails();