var confirm_btn = '<a href="#" id="confirm" class="btn btn-primary btn-default">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-check"></i>'
  + '</span>'
  + '</a>'
var info_btn = '<a href="#" id="info" class="btn btn-success btn-default">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-info"></i>'
  + '</span>'
  + '</a>'
var cancel_btn = '<a href="#" id="cancel" class="btn btn-danger btn-default">'
  + '<span class="icon text-white-50">'
  + '<i class="fas fa-times"></i>'
  + '</span>'
  + '</a>';


function getBookingList() {

  console.log("create Booking List");
  fetch(API_BOOKING_LIST)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++) {
        createNewRow(data[i]._id, data[i].userName.FName + " " + data[i].userName.LName, data[i].parkinglotName, data[i].areaName, data[i].slot_id, data[i].status);
      }
      $(document).ready(function () {
        $('#dataTable').DataTable();
      });

    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status) {
  var body = document.getElementById("tableBody");

  var row = document.createElement("tr");

  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBox(status, row);
  if (status == "Booked") {
    addButton(row, id, 1);
  }
  else {
    addButton(row, id, 2);
  }

  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}


function addButton(row, id, option) {
  var btn = document.createElement("td");
  btn.id = id;
  switch (option) {
    case 1:
      btn.innerHTML = confirm_btn + info_btn + cancel_btn;
      break;
    case 2:
      btn.innerHTML = info_btn;
      break;
  }
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, option);

}

function matchFunction(btnGroup, option) {
  var id = btnGroup.id;
  switch (option) {
    case 1:
      var confirmBtn = btnGroup.children[0];
      var infoBtn = btnGroup.children[1];
      var cancelBtn = btnGroup.children[2];
      confirmBtn.onclick = function () { handleConfirmButtonPress(id) };
      cancelBtn.onclick = function () { handleCancelButtonPress(id) };
      // handleConfirmButtonPress();
      break;
    case 2:
      // btn.innerHTML = info_btn;
      break;
  }
}

function handleConfirmButtonPress(id) {
  // alert(id);
  console.log(id);
  if (confirm("Are you sure to make this booking success?")) {
    confirmSuccessBooking(id);
    // location.reload();
  }
}

function confirmSuccessBooking(id) {
  fetch(API_BOOKING_LIST + "/" + id, {
    method: "PUT",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
    });
}
function handleCancelButtonPress(id) {
  console.log(id);
  if (confirm("Are you sure to cancel this booking?")) {
    confirmCancelBooking(id);
    // location.reload();
  }
}

function confirmCancelBooking(id) {
  fetch(API_BOOKING_LIST + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((error) => {
    });
}