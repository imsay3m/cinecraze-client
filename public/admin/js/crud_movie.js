const handleAddMovie = (event) => {
    const alert_parent = document.getElementById("alert-container")
    if (!alert_parent.classList.contains("hidden")) {
        alert_parent.classList.add("hidden")
    }
    event.preventDefault()
    const add_movie_url = `https://cinecraze-server.onrender.com/api/movies/add/`
    const tmdb_id = getValue("tmdb-id")
    const premium_user = document.getElementById("premium-user").checked ? true : false;
    const standard_user = document.getElementById("standard-user").checked ? true : false;

    try {
        const download_urls = JSON.parse(`[${document.getElementById("download-urls").value.trim()}]`);
        const streaming_urls = JSON.parse(`[${document.getElementById("streaming-urls").value.trim()}]`);
        const info = {
            tmdb_id: tmdb_id,
            premium_user: premium_user,
            standard_user: standard_user,
            download_urls: download_urls,
            streaming_urls: streaming_urls
        }
        console.log(info);

        if (tmdb_id) {
            fetch(add_movie_url, {
                method: "POST",
                body: JSON.stringify(info),
                headers: { "Content-Type": "application/json" }
            })
                .then(res => {
                    res.json()
                    if (res.status == 201) {
                        window.location.href = "movies.html"
                    }
                    else {
                        showAlert("Something went wrong. Please Check The TMDB ID.")
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    showAlert("Something went wrong. Please try again later.");
                })
        }
        else {
            showAlert("Please fill in all fields.")
        }
    } catch (error) {
        showAlert("Invalid JSON format in URLs fields.")
    }

}

const handleDeleteMovie = (event, id) => {
    event.preventDefault()
    const tmdb_id = id
    const delete_movie_url = `https://cinecraze-server.onrender.com/api/movies/delete/${tmdb_id}/`
    fetch(delete_movie_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status == 200) {
                console.log('Movie deleted successfully');
                window.location.href = "movies.html"
            } else {
                response.json().then(data => {
                    showAlert("Something went wrong. Please try again later.");
                    console.error('error:', data.error);
                });
            }
        })
        .catch(error => {
            console.error('error:', error);
        });
}