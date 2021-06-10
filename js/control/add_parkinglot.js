var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];
function addParkinglot() {
  var latitudeE = document.getElementById("lat");
  var longitudeE = document.getElementById("long");
  var addressE = document.getElementById("address");
  var nameE = document.getElementById("name");
  var thumnailE = document.getElementById("img");
  var ownerIDE = document.getElementById("ownerID");

  var latitude = latitudeE.value;
  var longitude = longitudeE.value;
  var address = addressE.value;
  var name = nameE.value;
  var thumnail = thumnailE.value;
  var ownerID = ownerIDE.value;

  console.log(JSON.parse(currentUserCookie).userType);
  if (JSON.parse(currentUserCookie).userType == "Admin") {
    ownerIDE.style.display = "block";
  } else if (JSON.parse(currentUserCookie).userType == "Owner") {
    ownerIDE.style.display = "none";
    ownerID = JSON.parse(currentUserCookie)._id;
  }

  fetch(API_PARKINGLOTS_LIST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinate: {
        latitude: longitude,
        longitude: latitude,
      },
      address: address,
      name: name,
      image: thumnail,
      ownerID: ownerID,
      status: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data._id != null) {
        alert("Create account successfully");
        if (JSON.parse(currentUserCookie).userType == "Admin") {
          window.location.href = "parkinglots.php";
      } else if (JSON.parse(currentUserCookie).userType == "Owner") {
        window.location.href = "owner_parkinglots.php";
      }
        
      } else {
        console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        addressE.value = "";
        ownerIDE.value = "";
        thumnailE.value = "";
        alert("Failed to create account");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}
