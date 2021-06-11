var confirm_btn =
  '<a href="#" id="confirm" class="btn btn-primary btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-check"></i>' +
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

function getParkingLotsList() {
  console.log("create Parking lots List");
  fetch(API_PARKINGLOTS_LIST)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot =
            totalslot + data[i].area[j].freeslot + data[i].area[j].fullslot;
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
        $("#dataTable").DataTable();
      });
    });
}

function getOwnedParkingLotsList() {
  var currentUserCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentUser="))
    .split("=")[1];

  console.log("create Owned Parking lots List");
  fetch(API_OWNER_LIST + "/" + JSON.parse(currentUserCookie)._id + "/parking")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++) {
          totalslot =
            totalslot + data[i].area.freeslot + data[i].area[j].fullslot;
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
        $("#dataTable").DataTable();
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
  addButton(row, id);
  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}

function addButton(row, id) {
  var btn = document.createElement("td");
  btn.id = id;
  btn.innerHTML = info_btn + cancel_btn;
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn);
}

function matchFunction(btnGroup) {
  var id = btnGroup.id;
  var infoBtn = btnGroup.children[0];
  var cancelBtn = btnGroup.children[1];
  cancelBtn.onclick = function () {
    handleCancelButtonPress(id);
  };
}

function handleCancelButtonPress(id) {
  console.log(id);
  if (confirm("Are you sure to DELETE this parking lot?")) {
    confirmCancelBooking(id);
  }
}

function confirmCancelBooking(id) {
  fetch(API_PARKINGLOTS_LIST + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {});
}
