// Call the dataTables jQuery plugin
$(document).ready(function () {
  function showpanel() {
    $('#dataTable').DataTable();
  };

  // use setTimeout() to execute
  setTimeout(showpanel, 5000)
});


