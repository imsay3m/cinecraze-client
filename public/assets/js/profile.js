//1. FETCH USER PROFILE DATA
const handleProfileData = () => {
    if (!isAuthenticated()) {
        loginRedirector()
    }
    const user_details_api = `https://cinecraze-server.onrender.com/user/account/${user_id}/`;
    fetch(user_details_api, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const name = data.name;
            const email = data.email;
            const user_type = (data.user_type).toUpperCase();
            if (user_type === "ADMIN") {
                const sidebar_admin_panel_btn = document.getElementById("sidebar-admin-panel-btn");
                sidebar_admin_panel_btn.classList.remove("hidden");
                sidebar_admin_panel_btn.classList.add("block");
            }
            const parent_div = document.getElementById("profile-data-container");
            const child_div = document.createElement("div");
            child_div.classList.add('bg-gray-100', 'bg-profile-background', 'bg-cover', 'bg-cover', 'p-10', 'rounded-[10px]', 'flex', 'flex-col', 'gap-y-4', 'items-start');
            child_div.innerHTML =
                `
            <div class="block" id="name-edit-icon">
                <div class="flex flex-row justify-start items-center gap-x-4">
                    <h2 class="text-2xl lg:text-4xl font-medium font-roboto text-white">
                        ${name}
                    </h2>
                    <img onclick="editProfileToggle()"
                        class="p-2 border border-[#262626] bg-transparent rounded-md hover:bg-primary"
                        src="assets/images/profile/edit.png" alt="">
                </div>
            </div>
            <div class="hidden" id="name-save-icon">
                <form method="post" class="flex flex-row justify-start items-center gap-x-1">
                    <input type="text" id="name-input"
                        class="hidden w-full p-2.5 bg-tertiary border border-[#262626] focus:border-[#262626] focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-red-600 rounded-md"
                        placeholder="Enter Full Name" autocomplete="name" value="${name}">
                    <img onclick="refreshPage()"
                        class="p-2.5 border border-[#262626] bg-transparent rounded-md hover:bg-primary"
                        src="assets/images/profile/cancel.png" alt="" id="name-edit-cancel-icon">
                    <img onclick="handleSaveName(event)"
                        class="p-2.5 border border-[#262626] bg-transparent rounded-md hover:bg-primary"
                        src="assets/images/profile/check-mark.png" alt="">
                </form>
            </div>
            <p class="text-lg lg:text-xl text-white font-roboto">${email}</p>
            <button class="text-white hover:text-primary px-4 py-3 bg-tertiary border border-[#262626] rounded-md">
                ${user_type}
            </button>
            `
            parent_div.appendChild(child_div);
        })
}
handleProfileData()


// 2. EDIT NAME FIELD TOGGLE
const editProfileToggle = () => {
    const name_edit_icon = document.getElementById("name-edit-icon");
    const name_save_icon = document.getElementById("name-save-icon");

    if (name_edit_icon.classList.contains("block")) {
        name_edit_icon.classList.remove("block");
        name_edit_icon.classList.add("hidden");
    }
    if (name_save_icon.classList.contains("hidden")) {
        name_save_icon.classList.remove("hidden");
        name_save_icon.classList.add("block");
    }
    const name_input = document.getElementById("name-input");
    if (name_input.classList.contains("hidden")) {
        name_input.classList.remove("hidden");
    }
}


// 3. SAVE NAME
const handleSaveName = (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
        loginRedirector()
    }
    const user_details_api = `https://cinecraze-server.onrender.com/user/account/${user_id}/`;
    const name_input = getValue("name-input");
    fetch(user_details_api, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: name_input,
        }),
    })
        .then(response => {
            response.json()
            // console.log(response)
            window.location.href = "profile.html";
        })
}

// 4.CHANGE PASSWORD TOGGLE
const changePasswordToggle = () => {
    const profile_data_container = document.getElementById("profile-data-container");
    profile_data_container.classList.add("hidden");
    const change_password_container = document.getElementById("change-password-container");
    change_password_container.classList.remove("hidden");
    change_password_container.classList.add("block");
    const sidebar_profile_btn = document.getElementById("sidebar-profile-btn");
    if (sidebar_profile_btn.classList.contains("bg-secondery")) {
        sidebar_profile_btn.classList.remove("bg-secondery", "border", "border-[#262626]", "rounded-lg");
    }
    const sidebar_change_password_btn = document.getElementById("sidebar-change-password-btn")
    sidebar_change_password_btn.classList.add("bg-secondery", "border", "border-[#262626]", "rounded-lg");
}


// 5.CHANGE PASSWORD
const handleChangePassword = (event) => {
    event.preventDefault();
    if (!isAuthenticated()) {
        loginRedirector()
    }
    const old_password = getValue("old-password");
    const new_password = getValue("new-password");
    const confirm_password = getValue("confirm-password");
    const change_password_api = `https://cinecraze-server.onrender.com/user/change_password/`;
    if (new_password == confirm_password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(new_password)) {
            fetch(change_password_api, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    user_id: user_id,
                    old_password: old_password,
                    password: new_password,
                    password2: confirm_password,
                }),
            })
                .then(response => response.json().then(data => ({
                    status: response.status,
                    body: data
                })))
                .then(({ status, body }) => {
                    if (status === 200) {
                        showSuccess(body.message);
                    } else {
                        showAlert(body.non_field_errors[0] || "Password Change Fail. Please try again.");
                    }
                })
                .catch(err => {
                    showAlert("An error occurred. Please try again later.");
                    console.error(err);
                });
        }
        else {
            showAlert("Password must contain at least one letter, one digit, and be at least 8 characters long")
        }
    }
    else {
        showAlert("Your New password and Confirm password do not match.")
    }
}
