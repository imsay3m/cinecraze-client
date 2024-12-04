// 1. LOAD ALL CINE REQUESTS
const loadCineRequest = () => {
    const apiURL = `https://cinecraze-server.onrender.com/api/cine-request/`;
    fetch(apiURL, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            displayCineRequest(data);
        })
        .catch(err => console.error("Error fetching cine requests:", err));
};

// 2. DISPLAY ALL CINE REQUESTS
const displayCineRequest = (data) => {
    const parentDiv = document.querySelector('#cine-request-list-container');
    const noDataCard = document.getElementById("no-data-card");
    const requestListCard = document.getElementById("cine-request-list-card");

    // Clear existing content
    parentDiv.innerHTML = "";

    if (data.length > 0) {
        noDataCard.classList.add("hidden");
        requestListCard.classList.remove("hidden");

        data.forEach(request => {
            const { id, name, email, solved } = request;
            const isSolved = solved;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${name}</td>
                <td>${email}</td>
                <td>
                    <button 
                        class="btn ${isSolved ? 'btn-info' : 'btn-success'} btn-xs" 
                        ${isSolved ? 'disabled' : ''}
                        onclick="markAsSolved(${id})">
                        ${isSolved ? 'Solved' : 'Mark as Solved'}
                    </button>
                </td>
                <td>
                    <button class="btn btn-warning btn-xs" onclick="viewRequest(${id})">View</button>
                    <button class="btn btn-error btn-xs" onclick="deleteRequest(${id})">Delete</button>
                </td>
            `;
            parentDiv.appendChild(row);
        });
    } else {
        noDataCard.classList.remove("hidden");
        requestListCard.classList.add("hidden");
    }
};

// 3. MARK REQUEST AS SOLVED
const markAsSolved = (id) => {
    const apiURL = `https://cinecraze-server.onrender.com/api/cine-request/solved/${id}/`;
    fetch(apiURL, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status: "SOLVED" }),
    })
        .then(response => {
            if (response.ok) {
                showSuccess("Cine request marked as solved!");
                setTimeout(() => {
                    window.location.href = "cine-requests.html"
                }, 4000);
            } else {
                throw new Error("Failed to mark cine request as solved.");
            }
        })
        .catch((error) => {
            showAlert(error.message);
        });
};

// 4. DELETE A CINE REQUEST
const deleteRequest = (id) => {
    const apiURL = `https://cinecraze-server.onrender.com/api/cine-request/${id}/`;
    fetch(apiURL, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    })
        .then((response) => {
            if (response.ok) {
                showAlert("Cine request deleted successfully!");
                setTimeout(() => {
                    window.location.href = "cine-requests.html"
                }, 4000);
            } else {
                throw new Error("Failed to delete cine request.");
            }
        })
        .catch((error) => {
            showAlert(error.message);
        });
};

// 5. VIEW REQUEST DETAILS
// Utility to format message with newlines and proper structure
const formatMessage = (message) => {
    return message
        .replace(/🎬 Movie\/Show Request/g, "🎬 Movie/Show Request:")
        .replace(/📌 Title:/g, "\n📌 Title:")
        .replace(/🎥 Release Year:/g, "\n🎥 Release Year:")
        .replace(/📝 Language:/g, "\n📝 Language:")
        .replace(/📎 IMDB Link:/g, "\n📎 IMDB Link:");
};

// View Cine Request details with formatted message
const viewRequest = (id) => {
    const apiURL = `https://cinecraze-server.onrender.com/api/cine-request/${id}/`;
    const modal = document.getElementById("cine-request-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    fetch(apiURL, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch CineRequest details.");
            }
        })
        .then((data) => {
            const { name, email, message } = data;
            modalTitle.textContent = `Cine Request Details for ${name}`;
            modalContent.innerHTML = `
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <pre>${formatMessage(message)}</pre>
            `;

            // Show modal
            modal.showModal();
        })
        .catch((error) => {
            showAlert(error.message);
        });
};



// Utility to initialize the page
loadCineRequest(); // Load requests on page load
