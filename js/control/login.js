
function login() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    console.log("Click login button");

    fetch('http://gogito.duckdns.org:3002/login', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: user, password: pass }),
    })
        .then(response => response.json())
        .then(data => {
            
            // window.location.href = "index.html"
            if (data._id != null) window.location.href = "index.php";
            else console.log(data);
        })
        .catch((error) => {
            // console.log(error.response);
        });
}

