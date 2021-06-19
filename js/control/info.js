var currentUserCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUser="))
  .split("=")[1];
var userTypeInfo = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfoType="))
  .split("=")[1];
var currentUserInfoCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentUserInfo="))
  .split("=")[1];

// console.log(userTypeInfo);
function updateUserInfo() {
  
  var ownerParkinglot = document.getElementById("ownerParkinglot");
  var updateBtn = document.getElementById("updateBtn");

  var name = document.getElementById("name");
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var personalID = document.getElementById("personalID");
  var parkinglot = document.getElementById("parkinglot");

  if (userType == "Admin") {
    ownerParkinglot.style.display = "none";
    updateBtn.style.display = "block";
  } else if (userType == "Owner") {
    updateBtn.style.display = "none";
    ownerParkinglot.style.display = "block";
    parkinglot.value = JSON.parse(currentUserCookie).ownedParking.length;
  }

  getUserInfo(name, username, email, personalID);
}

function getUserInfo(name, username, email, personalID) {
  getBookingList();
  getParkingLotsList();
    var LINKAPI = API_USER_LIST;
    // console.log(userTypeInfo);
  if (userTypeInfo == "Owner") LINKAPI = API_OWNER_LIST
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
