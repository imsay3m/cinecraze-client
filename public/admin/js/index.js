const updateStats = () => {
    const cineRequestsAPI = 'https://cinecraze-server.onrender.com/api/cine-request/';
    const usersAPI = 'https://cinecraze-server.onrender.com/user/account/';
    const moviesAPI = 'https://cinecraze-server.onrender.com/api/movies/';

    // Fetch all API data concurrently
    Promise.all([
        fetch(cineRequestsAPI).then(response => response.json()),
        fetch(usersAPI).then(response => response.json()),
        fetch(moviesAPI).then(response => response.json())
    ])
        .then(([cineRequests, users, movies]) => {
            // Extract lengths
            const cineRequestCount = cineRequests.length || 0;
            const userCount = users.length || 0;
            const movieCount = movies.length || 0;

            // Update the DOM
            document.querySelector('.stat:nth-child(1) .stat-value').textContent = cineRequestCount.toLocaleString();
            document.querySelector('.stat:nth-child(2) .stat-value').textContent = userCount.toLocaleString();
            document.querySelector('.stat:nth-child(3) .stat-value').textContent = movieCount.toLocaleString();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            // Hide loading animation after the stats are updated
            document.getElementById('loading-screen').classList.add('hidden');
        });
};

// Run the function on page load
window.onload = updateStats;
