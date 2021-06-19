var latitudeE = document.getElementById("lat");
var longitudeE = document.getElementById("long");
var numberE = document.getElementById("address_number");
var streetE = document.getElementById("address_street");
var districtE = document.getElementById("address_district");
var cityE = document.getElementById("address_city");
var countryE = document.getElementById("address_country");
var nameE = document.getElementById("name");
var thumnailE = document.getElementById("img");
function updateParkinglotInfo() {
  var latitude = latitudeE.value;
  var longitude = longitudeE.value;
  var number = numberE.value;
  var street = streetE.value;
  var district = districtE.value;
  var city = cityE.value;
  var country = countryE.value;
  var name = nameE.value;
  var thumnail = thumnailE.value;
  var data = { info: {} };
  //   console.log(latitude);
  if (latitude.length > 0 && longitude.length > 0) {
    // console.log("Run");
    data.info = { coordinate: { longitude: latitude, latitude: longitude } };
  }
  if (country != "")
    data.info = {
      ...data.info,
      detail_address: {
        country: country,
      },
    };
  if (city != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        city_province: city,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          city_province: city,
        },
      };
    }
  }
  if (district != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        district: district,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          district: district,
        },
      };
    }
  }
  if (street != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        street: street,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          street: street,
        },
      };
    }
  }

  if (number != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        number: number,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          number: number,
        },
      };
    }
  }
  if (name != "") {
    data.info = { ...data.info, name: name };
  }
  if (thumnail != "") {
    data.info = { ...data.info, image: thumnail };
  }
  console.log(data);
  putUserInfo(data);
}

function getOldData(){
  // console.log("get old data");
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
    console.log(API_PARKINGLOTS_LIST + "/" + currentParkinglotID);
    fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      latitudeE.placeholder = data.coordinate.longitude;
      longitudeE.placeholder = data.coordinate.latitude;
      nameE.placeholder = data.name;
      numberE.placeholder = data.detail_address.number;
      streetE.placeholder = data.detail_address.street;
      districtE.placeholder = data.detail_address.district;
      cityE.placeholder = data.detail_address.city_province;
      countryE.placeholder = data.detail_address.country;
    });
}
function putUserInfo(dataIn) {
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  console.log(JSON.stringify(dataIn));
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataIn),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data._id != null) {
        alert("Update parking lot successfully");
        window.location.href = "parkinglots.php";
      } else {
        console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        numberE.value = "";
        streetE.value = "";
        districtE.value = "";
        cityE.value = "";
        countryE.value = "";
        nameE.value = "";
        thumnailE.value = "";
        alert("Failed to update parking lot");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}
