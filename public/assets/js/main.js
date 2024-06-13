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