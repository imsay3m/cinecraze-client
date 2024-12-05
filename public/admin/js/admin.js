const isAdmin = () => {
    const admin_token = localStorage.getItem("cinecraze_user_type");
    return admin_token;
};
if (isAdmin() != 'admin') {
    // User is authenticated, redirect to userDetails page
    window.location.href = "/public/login.html";
}