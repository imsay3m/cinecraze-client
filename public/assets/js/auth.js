if (getUserToken) {
    // User is authenticated, redirect to userDetails page
    window.location.href = "profile.html";
}

const handleSignup = (event) => {
    event.preventDefault()
    const signup_api = 'https://cinecraze-server.onrender.com/user/register/';

    const name = getValue("full-name")
    const email = getValue("email")
    const password = getValue("password")
    const confirm_password = getValue("confirm-password")
    const user_type = "basic"
    // console.log(info)
    if (email) {
        if (password === confirm_password) {
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                try {
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    formData.append("password", password);
                    formData.append("user_type", user_type);
                    fetch(signup_api, {
                        method: "POST",
                        body: formData,
                    })
                        .then(response => response.json().then(data => ({
                            status: response.status,
                            body: data
                        })))
                        .then(({ status, body }) => {
                            if (status === 200) {
                                showSuccess(body.message);
                            } else {
                                showAlert(body.message || "Registration failed. Please try again.");
                            }
                        })
                        .catch(err => {
                            showAlert("An error occurred. Please try again later.");
                            console.error(err);
                        });
                } catch (err) {
                    console.log(err.message)
                    console.log(err)
                }
            }
            else {
                showAlert("Password must contain at least one letter, one digit, and be at least 8 characters long.")
            }
        }
        else {
            showAlert("Your passwords do not match.")
        }
    }
    else {
        showAlert("Please enter a valid email address and your full name.")
    }
}



const handleLogin = (event) => {
    event.preventDefault();
    const login_api = 'https://cinecraze-server.onrender.com/user/login/';
    const email = getValue("email-login");
    const password = getValue("password-login");
    if (email && password) {
        fetch(login_api, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.token && data.user_id) {
                    localStorage.setItem("cinecraze_token", data.token);
                    localStorage.setItem("cinecraze_user_id", data.user_id);
                    localStorage.setItem("cinecraze_user_type", data.user_type);
                    window.location.href = "profile.html";
                }
                else {
                    showAlert("Invalid email or password.")
                }
            })
            .catch(error => {
                console.error("Error while logging in:", error);
            });
    }
};

const handleLogout = () => {
    loginRedirector()
    const logout_api = 'https://cinecraze-server.onrender.com/user/logout/';
    const token = localStorage.getItem('cinecraze_token')
    fetch(logout_api, {
        method: "GET",
        authorization: `Token ${token}`,
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('cinecraze_token')
            localStorage.removeItem('cinecraze_user_id')
            localStorage.removeItem('cinecraze_user_type')
            window.location.href = "index.html"; // Redirect to the home page after successful logout
        })
}
