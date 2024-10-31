// 1. GET ALL CINEREQUEST
const loadCineRequest = () => {
    const users_api = `https://cinecraze-server.onrender.com/api/cine-request/`;
    fetch(users_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            displayCineRequest(data);
        });
}

// 2. DISPLAY ALL CINEREQUEST
const displayCineRequest = (data) => {
    const parent_div = document.querySelector('#cine-request-list-container');
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
                                <a href="https://cinecraze-client.vercel.app/movie-details.html?tmdb_id=${tmdb_id}" target="_blank" rel="noopener noreferrer">
                                    <img src=${poster_url} alt="${title}" />
                                </a>
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
                            <a href="update-movies.html?tmdb_id=${tmdb_id}" class="btn btn-warning btn-xs">EDIT</a>
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

    data.forEach(element => {
        const user_id = element.id;
        const name = element.name;
        const email = element.email;
        const user_list_container_child = document.createElement("tr");
        user_list_container_child.innerHTML = `
            <tr class="" id="demo-request-card">
                <td>${user_id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>
                    <button class="btn btn-info btn-xs">${user_type}</button>
                </td>
                <td>
                    ${user_type === "ADMIN" ? adminUser(user_id) : user_type === "PREMIUM" ? premiumUser(user_id) : basicUser(user_id)}
                </td>
                <td>
                ${user_type === "ADMIN" ? '<button class="btn btn-error btn-xs" disabled>Delete</button>' : '<button class="btn btn-error btn-xs" onclick="handleDeleteUser(event,${user_id})">Delete</button>'}
                </td>
            </tr>
        `;
        parent_div.appendChild(user_list_container_child);
    });
}