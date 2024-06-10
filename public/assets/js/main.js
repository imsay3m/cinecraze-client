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

//3. SWIPER CAROUSEL
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
