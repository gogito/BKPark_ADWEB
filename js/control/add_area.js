var currentParkingrCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("updateParkinglot="))
  .split("=")[1];
function updateInfo(){
  var parkingName = document.getElementById("parkinglotName");
  parkingName.value = JSON.parse(currentParkingrCookie).name;
}
function addParkinglot() {
  var nameE = document.getElementById("name");
  var slotE = document.getElementById("slot");
  var priceE = document.getElementById("price");

  var name = nameE.value;
  var slot = slotE.value;
  var price = priceE.value;


  fetch(API_PARKINGLOTS_LIST + "/" + JSON.parse(currentParkingrCookie).id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      coordinate: {
        name: slot,
        slot: name,
      },
      address: address,
      name: name,
      image: price,
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
        window.location.href = "owner_parkinglot.php";
      }
        
      } else {
        console.log(data);
        nameE.value = "";
        slotE.value = "";
        addressE.value = "";
        ownerIDE.value = "";
        priceE.value = "";
        alert("Failed to create account");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}
