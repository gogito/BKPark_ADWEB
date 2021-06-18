function updateParkinglotInfo() {
  var latitudeE = document.getElementById("lat");
  var longitudeE = document.getElementById("long");
  var numberE = document.getElementById("address_number");
  var streetE = document.getElementById("address_street");
  var districtE = document.getElementById("address_district");
  var cityE = document.getElementById("address_city");
  var countryE = document.getElementById("address_country");
  var nameE = document.getElementById("name");
  var thumnailE = document.getElementById("img");

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
  if (number != "")
    data.info = {
      ...data.info,
      detailAddress: {
        number: number,
      },
    };
  if (street != "") {
    if (data.info.detailAddress) {
      data.info.detailAddress = {
        ...data.info.detailAddress,
        street: street,
      };
    } else {
      data.info = {
        ...data.info,
        detailAddress: {
          street: street,
        },
      };
    }
  }
  if (district != "") {
    if (data.info.detailAddress) {
      data.info.detailAddress = {
        ...data.info.detailAddress,
        district: district,
      };
    } else {
      data.info = {
        ...data.info,
        detailAddress: {
          district: district,
        },
      };
    }
  }
  if (city != "") {
    if (data.info.detailAddress) {
      data.info.detailAddress = {
        ...data.info.detailAddress,
        city_province: city,
      };
    } else {
      data.info = {
        ...data.info,
        detailAddress: {
          city_province: city,
        },
      };
    }
  }

  if (country != "") {
    if (data.info.detailAddress) {
      data.info.detailAddress = {
        ...data.info.detailAddress,
        country: country,
      };
    } else {
      data.info = {
        ...data.info,
        detailAddress: {
          country: country,
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
