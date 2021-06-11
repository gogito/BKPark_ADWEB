var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];
var userType = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfoType="))
  .split("=")[1];
var currentUserInfoCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfo="))
  .split("=")[1];

console.log(userType);
function updateUserInfo() {
  var ownerParkinglot = document.getElementById("ownerParkinglot");

  var name = document.getElementById("name");
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var personalID = document.getElementById("personalID");
  var parkinglot = document.getElementById("parkinglot");

  if (userType == "Admin") {
    ownerParkinglot.style.display = "none";
  } else if (userType == "Owner") {
    ownerParkinglot.style.display = "block";
    parkinglot.value = JSON.parse(currentUserCookie).ownedParking.length;
  }

  getUserInfo(name, username, email, personalID);
}

function getUserInfo(name, username, email, personalID) {
    var LINKAPI = API_USER_LIST;
  if (userType == "Owner") LINKAPI = API_OWNER_LIST
  console.log(LINKAPI);
  fetch(LINKAPI + "/" + currentUserInfoCookie, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      name.innerHTML = data.name.FName + " " + data.name.LName;
      username.value = data.username;
      email.value = data.email;
      personalID.value = data.personalID;
    })
    .catch((error) => {});
}
