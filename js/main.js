;(function (W, D, Site) {

  // Using Google Maps API for creating an interactive map
  (function () {
    if (W.google && W.google.maps) {
      function mapInit() {

        var centerLatLng = new W.google.maps.LatLng(59.938783, 30.323083);
        var targetLatLng = new W.google.maps.LatLng(59.938783, 30.323083);

        var mapOptions = {
          center: centerLatLng,
          mapTypeId: W.google.maps.MapTypeId.ROADMAP,
          zoom: 16
        };

        var markerImg = "img/icon-map-marker.svg";

        var map = new W.google.maps.Map(document.getElementById("contacts-map"), mapOptions);

        var marker = new W.google.maps.Marker({
          clickable: true,
          icon: markerImg,
          map: map,
          position: targetLatLng,
          title: "Офис Pink",
          shape: {
            coords: [0, 0, 36, 35],
            type: "rect"
          }
        });
      }

      W.google.maps.event.addDomListener(window, "load", mapInit);
    }
  })();

  // Handling MainMenu toggling
  (function () {
    var menuElem = document.querySelector(".main-menu");
    var menuToggle = document.querySelector(".main-menu__toggle");

    menuElem.classList.remove("main-menu--no-js");

    menuToggle.addEventListener('click', function() {

      if (menuElem.classList.contains("main-menu--closed")) {

        menuElem.classList.remove("main-menu--closed");
        menuElem.classList.add("main-menu--opened");

      } else {

        menuElem.classList.add("main-menu--closed");
        menuElem.classList.remove("main-menu--opened");

      }

    });
  })();

})(window, document, window.PinkSite || {});
