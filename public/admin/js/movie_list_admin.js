const loadMovies = (search = null) => {
    const movies_url = `https://cinecraze-server.onrender.com/api/movies/?search=${search ? search : ""}`
    fetch(movies_url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            const no_data_card = document.getElementById("no-data-card");
            const movie_list_card = document.getElementById("movie-list-card");
            if (data.length > 0) {
                if (no_data_card.classList.contains("block")) {
                    no_data_card.classList.remove("block");
                    no_data_card.classList.add("hidden");
                    movie_list_card.classList.remove("hidden");
                    movie_list_card.classList.add("block");
                }
                const movie_list_container = document.getElementById("movie-list-container");
                movie_list_container.innerHTML = "";
                // console.log(data);
                data.forEach(element => {
                    const tmdb_id = element.tmdb_id;
                    const title = element.title;
                    const poster_url = element.poster_url;
                    const release_date = convertDate(element.release_date);
                    const standard_user = element.standard_user;
                    const premium_user = element.premium_user;
                    const production_country = element.production_countries[0];

                    const movie_list_container_child = document.createElement("tr");
                    movie_list_container_child.innerHTML =
                        `
                        <td>${tmdb_id}</td>
                        <td>
                            <div class="flex flex-wrap items-center  gap-3">
                                <div class="avatar w-20">
                                    <img src=${poster_url} alt="${title}" />
                                </div>
                                <div class="text-left">
                                    <div class="font-bold">${title}</div>
                                    <div class="text-sm opacity-50">${production_country}</div>
                                    <div class="badge badge-info badge-sm">${release_date}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-col gap-2 flex-wrap">
                                <label class="cursor-pointer">
                                    <input type="checkbox" ${premium_user ? "checked" : ''} class="checkbox checkbox-info" />
                                    <span>Premium User</span>
                                </label>
                                <label class="cursor-pointer">
                                    <input type="checkbox" ${standard_user ? "checked" : ''} class="checkbox checkbox-info" />
                                    <span>Standard User</span>
                                </label>
                            </div>
                        </td>
                        <td>
                            <button class="btn btn-warning btn-xs">EDIT</button>
                            <button onclick="handleDeleteMovie(event,${tmdb_id})" class="btn btn-error btn-xs">DELETE</button>
                        </td>
                        `

                    movie_list_container.appendChild(movie_list_container_child);
                });
            }
            else {
                if (no_data_card.classList.contains("hidden")) {
                    movie_list_card.classList.remove("block");
                    movie_list_card.classList.add("hidden");
                    no_data_card.classList.remove("hidden");
                    no_data_card.classList.add("block");
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
loadMovies();


const handleMovieSearch = () => {
    const movie_search = getValue("movie-search");
    // console.log(movie_search);
    loadMovies(movie_search);
}