<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

    <!-- Sidebar Toggle (Topbar) -->
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
    </button>

    <!-- Topbar Search -->
    <div>
        <p id="timeupdated">Loaded At: 00:00:00</p>
    </div>

    <!-- Topbar Navbar -->
    <?php include 'top_nav.php'; ?>
    <script>
        function getTime() {
            let date_ob = new Date();
            // current date
            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);

            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

            // current year
            let year = date_ob.getFullYear();

            // current hours
            let hours = date_ob.getHours();

            // current minutes
            let minutes = date_ob.getMinutes();

            // current seconds
            let seconds = date_ob.getSeconds();

            let time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

            return time;
        }

        var time = getTime();
        var timeinfo = document.getElementById("timeupdated");
        timeinfo.innerHTML = "Updated: " + time;
    </script>
</nav>