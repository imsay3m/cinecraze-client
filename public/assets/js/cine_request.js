const handleRequest = (event) => {
    event.preventDefault();
    const request_api = 'https://cinecraze-server.onrender.com/api/cine-request/';
    const name = getValue("name-request");
    const email = getValue("email-request");
    const message = getValue("message-request");
    if (name && email && message) {
        const info = {
            name: name,
            email: email,
            message: message,
        };
        fetch(request_api, {
            method: "POST",
            body: JSON.stringify(info),
            headers: { "content-type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                showSuccess("Your request has been sent. We will get back to you shortly via email.");
            })
            .catch((error) => {
                console.log(error);
                showAlert("Something went wrong. Please try again later.");
            });
    }
    else {
        showAlert("Please fill in all fields.");
    }
}