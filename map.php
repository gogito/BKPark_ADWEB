<head>
    <title>Quick Start - Leaflet</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0" />

    <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>

    <!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->
</head>

<body style="padding: 0; margin: 0">
    <div id="mapid" style="width: 100%; height: 100vh"></div>
    <script>
        var popupArray = [];
        var markerArray = [];

        var ORS_API_KEY =
            "5b3ce3597851110001cf624848475da112574d1eb33f2348aff842e8";
        var CUR_LOCATION;

        var mymap = L.map("mapid", {
            zoomControl: false,
            attributionControl: false,
        }).setView([10.7715454, 106.6577752], 16);

        L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
                maxZoom: 25,
                attribution: "Map data &copy; OpenStreetMap contributors, ",
                id: "mapbox/streets-v11",
            }
        ).addTo(mymap);

        var popup = L.popup();
        // function onMapClick(e) {
        // 	popup
        // 		.setLatLng(e.latlng)
        // 		.setContent("You clicked the map at " + e.latlng.toString())
        // 		.openOn(mymap);
        // }
        var fullLots = L.icon({
                iconUrl: "./fullSlot.png",
                iconSize: [38, 38]
            }),
            normalLots = L.icon({
                iconUrl: "${normalSlots}",
                iconSize: [38, 38]
            }),
            emptyLots = L.icon({
                iconUrl: "./fullSlots.png",
                iconSize: [38, 38]
            }),
            carLoc = L.icon({
                iconUrl: "${carLoc}",
                iconSize: [38, 38]
            });
        var curCarLocation = L.marker([10.7715454, 106.6577752], {
            icon: carLoc,
        }).addTo(mymap);

        function markLocation(lat, long, iconType, id) {
            switch (iconType) {
                case 1:
                    markerArray[id] = L.marker([lat, long], {
                        icon: emptyLots
                    }).on(
                        "click",
                        function(e) {
                            showDetail(id);
                        }
                    );

                    markerArray[id].addTo(mymap);
                    popupArray[id] = L.popup();
                    popupArray[id]
                        .setLatLng(markerArray[id].getLatLng())
                        .setContent("<p>Hello world!<br />This is a nice popup.</p>");

                    markerArray[id].bindPopup(popupArray[id]);
                    break;
                case 2:
                    markerArray[id] = L.marker([lat, long], {
                        icon: emptyLots
                    }).on(
                        "click",
                        function(e) {
                            showDetail(id);
                        }
                    );
                    markerArray[id].addTo(mymap);
                    break;
                case 3:
                    markerArray[id] = L.marker([lat, long], {
                        icon: emptyLots
                    }).on(
                        "click",
                        function(e) {
                            showDetail(id);
                        }
                    );
                    markerArray[id].addTo(mymap);
                    break;
                case 4:
                    var newLatLng = new L.LatLng(lat, long);
                    curCarLocation.setLatLng(newLatLng);
                    break;
                default:
                    var newLatLng = new L.LatLng(lat, long);
                    curCarLocation.setLatLng(newLatLng);
            }
        }

        function showDetail(id) {
            console.log(id);
            window.postMessage(id);
        }
        markLocation(10.77057, 106.672547, 1, "test1");
        // markLocation(10.77057, 106.673557, 4, "test2");
        function setCurLocation(location) {
            CUR_LOCATION = location;
        }

        function updateDetailPopup(id, name, status, price) {
            console.log(popupArray[id]);
            popupArray[id].setContent(
                "<p>" + name + "<br/>" + status + "<br/>" + price + "</p>"
            );
        }
        var routingLine;
        var routingLayer = L.layerGroup().addTo(mymap);
        var routingStyle = {
            color: "#ff7800",
            weight: 5,
            opacity: 0.65,
        };
        var routingGEOdata = L.geoJSON(routingLine, {
            style: routingStyle,
        });
        // var layerGroup = new L.LayerGroup();
        // layerGroup.addTo(map);
        function routing(curLong, curLat, desLong, desLat) {
            fetch(
                    "https://api.openrouteservice.org/v2/directions/driving-car?api_key=" +
                    ORS_API_KEY +
                    "&start=" +
                    curLong +
                    "," +
                    curLat +
                    "&end=" +
                    desLong +
                    "," +
                    desLat
                )
                .then((response) => response.json())
                .then((data) => {
                    routingLayer.removeLayer(routingGEOdata);
                    // mymap.removeLayer(routingLine);
                    routingLine = [{
                        type: "LineString",
                        coordinates: data.features[0].geometry.coordinates,
                    }, ];
                    routingGEOdata = L.geoJSON(routingLine, {
                        style: routingStyle,
                    });
                    routingLayer.addLayer(routingGEOdata);
                    console.log(routingLine);
                });
        }

        routing(106.6577752, 10.7715454, 106.6691782, 10.7679665);
        routing(106.6577752, 10.7715454, 106.6691782, 10.8679665);
    </script>
</body>