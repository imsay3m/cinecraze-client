const newlyAddedMovies = () => {
    const all_movies_api = 'https://cinecraze-server.onrender.com/api/movies/';
    fetch(all_movies_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const parent_div = document.querySelector('#all-movies-container');
            data.forEach(element => {
                const release_date = convertDate(element.release_date);

                const movie_card = document.createElement('div');
                movie_card.classList.add('p-3', 'lg:p-4', 'flex', 'flex-col', 'flex-wrap', 'rounded-[10px]', 'bg-secondery', 'mx-auto', 'gap-y-2', 'lg:gap-y-4');
                movie_card.innerHTML = `
                    <a href="movie-details.html?tmdb_id=${element.tmdb_id}">
                    <img class="w-[128px] lg:w-[200px] rounded-[10px]" src=${element.poster_url} alt="${element.title}">
                    </a>
                    <div class="flex flex-col gap-y-1">
                        <div class="tooltip" data-tip="${element.title}">
                                <h5 class="text-left font-medium text-sm lg:text-base line-clamp-1">
                                <a href="movie-details.html?tmdb_id=${element.tmdb_id}">${element.title}</a>
                                </h5>
                            </div>
                        <div class="flex gap-x-2 justify-start items-center text-[#999999] text-sm font-light">
                            <div class="flex gap-x-2 justify-start items-center ">
                                <img src="assets/images/movie-details/year-icon.png" alt="">
                                <p class="text-xs lg:text-sm">${release_date}</p>
                            </div>
                        </div>
                    </div>
                `;
                parent_div.appendChild(movie_card);
            });
        })
        .catch(error => {
            console.error("Error while fetching movies from api:", error);
        });
}
const upcomingMovies = () => {
    const upcoming_movies_api = 'https://cinecraze-server.onrender.com/api/movies/?upcoming=true';
    fetch(upcoming_movies_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const parent_div = document.querySelector('#upcoming-movies-container');
            if (data.length === 0) {
                const section = document.getElementById('upcoming-movies-section')
                section.classList.add('hidden')
            }
            else {
                data.slice(0, 5).forEach(element => {
                    const release_date = convertDate(element.release_date);

                    const movie_card = document.createElement('div');
                    movie_card.classList.add('p-3', 'lg:p-4', 'flex', 'flex-col', 'flex-wrap', 'rounded-[10px]', 'bg-secondery', 'mx-auto', 'gap-y-2', 'lg:gap-y-4');
                    movie_card.innerHTML = `
                    <a href="movie-details.html?tmdb_id=${element.tmdb_id}">
                    <img class="w-[128px] lg:w-[200px] rounded-[10px]" src=${element.poster_url} alt="${element.title}">
                    </a>
                    <div class="flex flex-col gap-y-1">
                        <div class="tooltip" data-tip="${element.title}">
                                <h5 class="text-left font-medium text-sm lg:text-base line-clamp-1">
                                <a href="movie-details.html?tmdb_id=${element.tmdb_id}">${element.title}</a>
                                </h5>
                            </div>
                        <div class="flex gap-x-2 justify-start items-center text-[#999999] text-sm font-light">
                            <div class="flex gap-x-2 justify-start items-center ">
                                <img src="assets/images/movie-details/year-icon.png" alt="">
                                <p class="text-xs lg:text-sm">${release_date}</p>
                            </div>
                        </div>
                    </div>
                `;
                    parent_div.appendChild(movie_card);
                });
            }

        })
        .catch(error => {
            console.error("Error while fetching movies from api:", error);
        });
}
const newReleasedMovies = () => {
    const new_released_movies_api = 'https://cinecraze-server.onrender.com/api/movies/?new_release=true';
    fetch(new_released_movies_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const parent_div = document.querySelector('#new-released-movies-container');
            if (data.length === 0) {
                const section = document.getElementById('new-released-movies-section')
                section.classList.add('hidden')
            }
            else {
                data.slice(0, 5).forEach(element => {
                    const release_date = convertDate(element.release_date);

                    const movie_card = document.createElement('div');
                    movie_card.classList.add('p-3', 'lg:p-4', 'flex', 'flex-col', 'flex-wrap', 'rounded-[10px]', 'bg-secondery', 'mx-auto', 'gap-y-2', 'lg:gap-y-4');
                    movie_card.innerHTML = `
                    <a href="movie-details.html?tmdb_id=${element.tmdb_id}">
                    <img class="w-[128px] lg:w-[200px] rounded-[10px]" src=${element.poster_url} alt="${element.title}">
                    </a>
                    <div class="flex flex-col gap-y-1">
                        <div class="tooltip" data-tip="${element.title}">
                                <h5 class="text-left font-medium text-sm lg:text-base line-clamp-1">
                                <a href="movie-details.html?tmdb_id=${element.tmdb_id}">${element.title}</a>
                                </h5>
                            </div>
                        <div class="flex gap-x-2 justify-start items-center text-[#999999] text-sm font-light">
                            <div class="flex gap-x-2 justify-start items-center ">
                                <img src="assets/images/movie-details/year-icon.png" alt="">
                                <p class="text-xs lg:text-sm">${release_date}</p>
                            </div>
                        </div>
                    </div>
                `;
                    parent_div.appendChild(movie_card);
                });
            }

        })
        .catch(error => {
            console.error("Error while fetching movies from api:", error);
        });
}
newReleasedMovies()
upcomingMovies()
newlyAddedMovies()