// 1. GET ALL USERS
const loadUsers = () => {
    const users_api = `https://cinecraze-server.onrender.com/user/account/`;
    fetch(users_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayUsers(data);
        });
}

// 2. DISPLAY ALL USERS
const displayUsers = (data) => {
    const parent_div = document.querySelector('#user-list-container');

    const adminUser = (userId) => `
        <button class="btn btn-warning btn-xs" disabled>Make Admin</button>
        <button class="btn btn-success btn-xs" onclick="handleSaveUserType(event, '${userId}', 'premium')">Make Premium</button>
        <button class="btn btn-neutral btn-xs" onclick="handleSaveUserType(event, '${userId}', 'basic')">Make Basic</button>
    `;

    const premiumUser = (userId) => `
        <button class="btn btn-warning btn-xs" onclick="handleSaveUserType(event, '${userId}', 'admin')">Make Admin</button>
        <button class="btn btn-success btn-xs" disabled>Make Premium</button>
        <button class="btn btn-neutral btn-xs" onclick="handleSaveUserType(event, '${userId}', 'basic')">Make Basic</button>
    `;

    const basicUser = (userId) => `
        <button class="btn btn-warning btn-xs" onclick="handleSaveUserType(event, '${userId}', 'admin')">Make Admin</button>
        <button class="btn btn-success btn-xs" onclick="handleSaveUserType(event, '${userId}', 'premium')">Make Premium</button>
        <button class="btn btn-neutral btn-xs" disabled>Make Basic</button>
    `;

    data.forEach(element => {
        const user_id = element.id;
        const name = element.name;
        const email = element.email;
        const user_type = (element.user_type).toUpperCase();
        const user_list_container_child = document.createElement("tr");
        user_list_container_child.innerHTML = `
            <tr class="" id="demo-movie-card">
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

// 3. UPDATE USER TYPE
const handleSaveUserType = (event, user_id, type) => {
    event.preventDefault();
    const user_details_api = `https://cinecraze-server.onrender.com/user/account/${user_id}/`;
    fetch(user_details_api, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            user_type: type,
        }),
    })
        .then(response => response.json())
        .then(() => {
            showSuccess("Successfully Updated the user type.");
            setTimeout(() => {
                window.location.href = "users.html";
            }, 4000);
        });
}

loadUsers();

const handleDeleteUser = (event, id) => {
    event.preventDefault()
    const user_id = id
    const delete_user_url = `https://cinecraze-server.onrender.com/user/account/${user_id}/`
    fetch(delete_user_url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status == 204) {
                console.log('User deleted successfully');
                showSuccess("User deleted successfully");
                setTimeout(() => {
                    window.location.href = "users.html"
                }, 3500);
            } else {
                showAlert("Something went wrong. Please try again later.");
                console.error('Error : Something went wrong. Please try again later.');
            }
        })
        .catch(error => {
            console.error('error:', error);
        });
}
