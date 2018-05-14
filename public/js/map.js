var mapContainerEl = document.getElementById("googleMap");
if (mapContainerEl) {
  var map;
  var latlng = new google.maps.LatLng(
    mapContainerEl.getAttribute("data-latitude"),
    mapContainerEl.getAttribute("data-longitude")
  );

  var stylez = [
    {
      featureType: "all",
      elementType: "all",
      stylers: [
        {
          saturation: -25
        }
      ]
    }
  ];

  var mapOptions = {
    zoom: 15,
    center: latlng,
    scrollwheel: false,
    scaleControl: false,
    disableDefaultUI: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, "gMap"]
    }
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

  map.setCenter({
    lat: mapContainerEl.getAttribute("data-latitude"),
    lng: mapContainerEl.getAttribute("data-longitude")
  });

  var marker = new google.maps.Marker({
    map: map,
    icon: "",
    position: map.getCenter(),
    animation: google.maps.Animation.BOUNCE
  });

  var mapType = new google.maps.StyledMapType(stylez, {
    name: "Grayscale"
  });

  map.mapTypes.set("gMap", mapType);
  map.setMapTypeId("gMap");
}
