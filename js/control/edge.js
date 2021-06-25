var totalEdge = document.getElementById("totalEdge");
var totalParkinglot = document.getElementById("totalParkinglot");
var totalRequest = document.getElementById("totalRequest");

console.log("Edge có chạy nha");
getRequest();
getCount();
setInterval(function () {
    getRequest();
    getCount();
}, 5000);
function getCount() {
    fetch(API_REQUEST + "/count")
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            totalEdge.innerHTML = data.total_edge_id_array.length;
            totalParkinglot.innerHTML = data.total_parkinglot_array.length;
        });

}
function getRequest() {
    fetch(API_REQUEST + "/total")
        .then((response) => response.json())
        .then((data) => {
            totalRequest.innerHTML = data.total_request;

        });
}