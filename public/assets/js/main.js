//1. MOBILE NAVIGATION MENU TOGGLE
function toggleNavMenu() {
    var x = document.getElementById("myLinks");
    var hamburgerIcon = document.getElementById("hamburger-icon")
    var closeIcon = document.getElementById("close-icon")
    if (x.style.display === "block") {
        x.style.display = "none";
        closeIcon.classList.add("hidden")
        hamburgerIcon.classList.remove("hidden")
    } else {
        x.style.display = "block";
        hamburgerIcon.classList.add("hidden")
        closeIcon.classList.remove("hidden")
    }
}

//2. FAQ TOGGLE
function toggleFAQ(btnId) {
    const faqElement = document.getElementById(btnId);
    let str = btnId;
    let parts = str.split('-');
    let idNumber = parts[parts.length - 1];
    const ansElement = document.getElementById(`ans-${idNumber}`)
    idNumber = parseInt(idNumber, 10);
    if (btnId.includes('plus-btn') && faqElement.classList.contains('block')) {
        faqElement.classList.remove('block');
        faqElement.classList.add('hidden');
        const minusElement = document.getElementById(`minus-btn-${idNumber}`);
        minusElement.classList.remove('hidden');
        minusElement.classList.add('block');
        ansElement.classList.remove('hidden');
        ansElement.classList.add('block');
    } else {
        faqElement.classList.remove('block');
        faqElement.classList.add('hidden');
        const plusElement = document.getElementById(`plus-btn-${idNumber}`);
        plusElement.classList.remove('hidden');
        plusElement.classList.add('block');
        ansElement.classList.remove('block');
        ansElement.classList.add('hidden');
    }
}

//3. GET VALUE FROM FORM
function getValue(id) {
    return document.getElementById(id).value;
}

//4. USER INFORMATION
const getUserId = localStorage.getItem('cinecraze_user_id');
const getUserType = localStorage.getItem('cinecraze_user_type');
const getUserToken = localStorage.getItem('cinecraze_user_token');

//4. LOGIN REDIRECTOR
const loginRedirector = () => {
    const token = localStorage.getItem('cinecraze_token');
    if (!token) {
        // User is not authenticated, redirect to login page or perform any other action
        window.location.href = "login.html"; // Redirect to the login page
        return;
    }
}

//5. AUTHENTICATED CHECKER
const isAuthenticated = () => {
    const token = localStorage.getItem("cinecraze_token");
    return token !== null;
};

//6. TOGGLE AUTH BUTTON
const toggleAuthElements = () => {
    const authenticatedButtons = document.querySelectorAll('#authenticated-user, #authenticated-user-mobile');
    const unauthenticatedButtons = document.querySelectorAll('#unauthenticated-user, #unauthenticated-user-mobile');
    if (isAuthenticated()) {
        authenticatedButtons.forEach(button => {
            if (button.classList.contains('hidden')) {
                button.classList.remove('hidden');
            }
            if (!button.classList.contains('flex')) {
                button.classList.add('flex');
            }
        })
        unauthenticatedButtons.forEach(button => {
            if (button.classList.contains('flex')) {
                button.classList.remove('flex');
            }
            if (!button.classList.contains('hidden')) {
                button.classList.add('hidden');
            }
        })
    } else {
        authenticatedButtons.forEach(button => {
            if (button.classList.contains('flex')) {
                button.classList.remove('flex');
            }
            if (!button.classList.contains('hidden')) {
                button.classList.add('hidden');
            }
        })
        unauthenticatedButtons.forEach(button => {
            if (button.classList.contains('hidden')) {
                button.classList.remove('hidden');
            }
            if (!button.classList.contains('flex')) {
                button.classList.add('flex');
            }
        })
    }
};


// Call the function to toggle visibility on page load
window.onload = toggleAuthElements;



// 7.SHOW ALERT AND SUCCESS MESSAGE
const showAlert = (message) => {
    const parent = document.getElementById("alert-container")
    parent.classList.remove("hidden")
    parent.innerHTML = ""
    parent.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
<span class="font-medium text-lg hover:text-primary">${message}</span>
    `
}


const showSuccess = (message) => {
    const parent = document.getElementById("success-container")
    parent.classList.remove("hidden")
    parent.innerHTML = ""
    parent.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
<span class="font-medium text-lg hover:text-white">${message}</span>
    `
}

// 8.DATE CONVERTER
const convertDate = (the_date) => {
    const date = new Date(the_date);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    const converted_date = `${day} ${month} ${year}`;
    // console.log(converted_date);
    return converted_date;
}

// 9. GET PARAMETERS FROM URL
const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    return params;
}