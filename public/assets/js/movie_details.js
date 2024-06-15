const movieDetails = (id) => {
    const tmdb_id = id;
    const movie_api = `https://cinecraze-server.onrender.com/api/movies/?tmdb_id=${tmdb_id}`;
    fetch(movie_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                console.log(element);
            });
        })
}
movieDetails(606717)