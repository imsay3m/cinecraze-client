// 1. EDIT NAME FIELD TOGGLE
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

//2. FETCH USER PROFILE DATA
const handleProfileData = () => {
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
            const parent_div = document.getElementById("profile-data");
            const child_div = document.createElement("div");
            child_div.classList.add('bg-gray-100', 'bg-card-b', 'p-10', 'rounded-[10px]', 'flex', 'flex-col', 'gap-y-4', 'items-start');
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
                <div class="flex flex-row justify-start items-center gap-x-1">
                    <input type="text" id="name-input"
                        class="hidden w-full p-2.5 bg-tertiary border border-[#262626] focus:border-[#262626] focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-red-600 rounded-md"
                        placeholder="Enter Full Name" autocomplete="name" value="${name}">
                    <img onclick="refreshPage()"
                        class="p-2.5 border border-[#262626] bg-transparent rounded-md hover:bg-primary"
                        src="assets/images/profile/cancel.png" alt="" id="name-edit-cancel-icon">
                    <img class="p-2.5 border border-[#262626] bg-transparent rounded-md hover:bg-primary"
                        src="assets/images/profile/check-mark.png" alt="">
                </div>
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
