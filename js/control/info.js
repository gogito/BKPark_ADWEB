var confirm_btn =
  '<a href="#" id="confirm" class="btn btn-primary btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-plus"></i>' +
  "</span>" +
  "</a>";
var info_btn =
  '<a href="#" id="info" class="btn btn-success btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-info"></i>' +
  "</span>" +
  "</a>";
var cancel_btn =
  '<a href="#" id="cancel" class="btn btn-danger btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-times"></i>' +
  "</span>" +
  "</a>";
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
  // getBookingList();
  // getParkingLotsList();
  var LINKAPI;
  var bookingtable = document.getElementById("bookingtable");
  var parkinglottable = document.getElementById("parkinglottable");
  // console.log(userTypeInfo);
  if (userTypeInfo == "Owner") {
    bookingtable.style.display = "none";
    parkinglottable.style.display = "block";
    getOwnedParkingLotsList()
    LINKAPI = API_OWNER_LIST;
  } else if (userTypeInfo == "User") {
    bookingtable.style.display = "block";
    parkinglottable.style.display = "none";
    
    LINKAPI = API_USER_LIST;
  }
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


function getOwnedParkingLotsList() {
  console.log("create Owned Parking lots List");
  var api = API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/parking"
  if (JSON.parse(currentUserCookie).userType == "Admin"){
    var currentUserInfoCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUserInfo="))
    .split("=")[1];
    api = API_OWNER_LIST + "/" + currentUserInfoCookie + "/parking"
  }
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot =
            totalslot + data[i].area[j].freeslot + data[i].area[j].fullslot;
            // console.log(totalslot);
        }
        createNewRow(
          data[i]._id,
          data[i].name,
          data[i].address,
          totalarea,
          totalslot,
          Math.round(data[i].status * 100) + "%"
        );
      }
      $(document).ready(function () {
        $("#dataParkinglotTable").DataTable();
      });
    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status) {
  var body = document.getElementById("tableBodyParkingLots");

  var row = document.createElement("tr");

  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBox(status, row);
  console.log(userid);
  addButton(row, id, userid);
  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function addButton(row, id, name) {
  var btn = document.createElement("td");
  btn.id = id;
  if (JSON.parse(currentUserCookie).userType == "Admin"){
    btn.innerHTML = info_btn + cancel_btn;
  }
  else if (JSON.parse(currentUserCookie).userType == "Owner"){
    btn.innerHTML = confirm_btn +  info_btn + cancel_btn;
  }

  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, name);
}

function matchFunction(btnGroup, name) {
  var id = btnGroup.id;
  var addBtn;
  var infoBtn;
  var cancelBtn;
  if (JSON.parse(currentUserCookie).userType == "Owner"){
    addBtn = btnGroup.children[0];
    infoBtn = btnGroup.children[1];
    cancelBtn = btnGroup.children[2];

    var cookie = {
      id: btnGroup.id,
      name: name
    }
    addBtn.onclick = function () {
      document.cookie = "updateParkinglot=" + JSON.stringify(cookie) + "; max-age=300; path=/;";
      window.location.href = "add_area.php";
    };
  }
  else if (JSON.parse(currentUserCookie).userType == "Admin"){
    infoBtn = btnGroup.children[0];
    cancelBtn = btnGroup.children[1];
  }

  cancelBtn.onclick = function () {
    handleCancelButtonPress(id);
  };

  infoBtn.onclick = function () {
    document.cookie = "currentParkinglot=" + id + "; max-age=3000; path=/;";
    window.location.href = "update_parkinglot.php";
  };


}

function handleCancelButtonPress(id) {
  console.log(id);
  if (confirm("Are you sure to DELETE this parking lot?")) {
    confirmCancelBooking(id);
    // window.location.href("parkinglots.php");
  }
}

function confirmCancelBooking(id) {
  fetch(API_PARKINGLOTS_LIST + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Delete parking lot successfully!");
      window.location.href("parkinglots.php");
    })
    .catch((error) => {
      alert("Failed to delete parking lot!");
    });
    // location.reload();
}
