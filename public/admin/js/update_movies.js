const handleUpdateMovie = (event) => {
    event.preventDefault()
    const params = getParams();
    const tmdb_id = params.get('tmdb_id')
    const update_movie_url = `https://cinecraze-server.onrender.com/api/movies/update/${tmdb_id}/`
    const premium_user = document.getElementById("premium-user").checked ? true : false;
    const standard_user = document.getElementById("standard-user").checked ? true : false;
    const fetch_latest = document.getElementById("fetch-latest").checked ? true : false;
    const download_urls = JSON.parse(`[${document.getElementById("download-urls").value.trim()}]`);
    const streaming_urls = JSON.parse(`[${document.getElementById("streaming-urls").value.trim()}]`);
    const info = {
        premium_user: premium_user,
        standard_user: standard_user,
        fetch_latest: fetch_latest,
        download_urls: download_urls,
        streaming_urls: streaming_urls
    }
    console.log(info);
    if (tmdb_id) {
        fetch(update_movie_url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info),
        })
            .then(res => {
                res.json()
                if (res.status == 200) {
                    showSuccess("Successfully updated the movie data");
                    setTimeout(() => {
                        window.location.href = "movies.html"
                    }, 4000);
                }
                else {
                    showAlert("Something went wrong. Please Check and Try Again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showAlert("Something went wrong. Please try again later.");
            })
    }
    else {
        showAlert("Please fill in tmdb id fields.")
    }
}

const loadInstance = () => {
    const params = getParams();
    const tmdb_id = params.get('tmdb_id')
    console.log(tmdb_id);
    const get_movie_url = `https://cinecraze-server.onrender.com/api/movies/?tmdb_id=${tmdb_id}`
    fetch(get_movie_url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const element = data[0];
            document.getElementById("tmdb-id").value = element.tmdb_id;
            document.getElementById("premium-user").checked = element.premium_user;
            document.getElementById("standard-user").checked = element.standard_user;

            const beautifyJSON = (obj) => JSON.stringify(obj, null, 4);
            const download_urls_string = element.download_urls.map(beautifyJSON).join(',\n');
            const streaming_urls_string = element.streaming_urls.map(beautifyJSON).join(',\n');
            document.getElementById("download-urls").value = download_urls_string;
            document.getElementById("streaming-urls").value = streaming_urls_string;
        })
        .catch(error => {
            console.error("Error:", error);
            showAlert("Something went wrong. Please try again later.");
        })
}

window.onload = loadInstance();