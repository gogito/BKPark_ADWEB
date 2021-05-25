
function login() {
    var userE = document.getElementById('username');
    var passE = document.getElementById('password');
    var user = userE.value;
    var pass = passE.value;
    console.log("Click login button");

    fetch(API_ADMIN_LOGIN, {
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
            else{
                console.log(data);
                userE.value = '';
                passE.value = '';
                alert("Wrong username or password");
            } 
        })
        .catch((error) => {
            // console.log(error.response);
        });
}

