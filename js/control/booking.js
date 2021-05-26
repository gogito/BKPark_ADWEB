function getBookingList() {
 
  console.log("create Booking List");
  fetch(API_BOOKING_LIST)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++){
        createNewRow(data[i]._id, data[i].userName.FName + " " + data[i].userName.LName, data[i].parkinglotName, data[i].areaName, data[i].slot_id, data[i].status);
      }
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

  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}