function addParkinglot() {
    var latitudeE = document.getElementById("lat");
    var longitudeE = document.getElementById("long");
    var addressE = document.getElementById("address");
    var nameE = document.getElementById("name");
    var thumnailE = document.getElementById("thumnail");
    var ownerIDE = document.getElementById("ownerID");
  
    var latitude = latitudeE.value;
    var longitude = longitudeE.value;
    var address = addressE.value;
    var name = nameE.value;
    var thumnail = thumnailE.value;
    console.log(latitude + longitude + address + name + thumnail + ownerID);

    fetch(API_PARKINGLOTS_LIST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coordinate: {
          latitude: latitude,
          longitude: longitude,
        },
        address: address,
        name: name,
        image: thumnail,
        ownerID: ownerID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data._id != null) {
          alert("Create account successfully");
          window.location.href = "parkinglot.php";
        } else {
          console.log(data);
          latitudeE.value = "";
          longitudeE.value = "";
          addressE.value = "";
          passE.value = "";
          plateE.value = "";
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
  
  