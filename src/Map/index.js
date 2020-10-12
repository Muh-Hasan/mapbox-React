import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "./map.css";

export default function Map() {
  const mapContainer = useRef(null);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);
  const token =
    "pk.eyJ1IjoibXVoLWhhc2FuIiwiYSI6ImNrZzRzNXh2dDBuZXoyc2xkMmNvbG52MjQifQ.h9QCn3uBMvqX6KCj26yNTQ";
  mapboxgl.accessToken = token;
  const locations = [
    { coordinates: { lat: -77.034084142948, long: 38.909671288923 } },
    { coordinates: { lat: -77.049766, long: 38.900772 } },
    { coordinates: { lat: -77.043929, long: 38.910525 } },
    { coordinates: { lat: -77.0672, long: 38.90516896 } },
    { coordinates: { lat: -77.002583742142, long: 38.887041080933 } },
    { coordinates: { lat: -76.933492720127, long: 38.99225245786 } },
    { coordinates: { lat: -77.097083330154, long: 38.980979 } },
    { coordinates: { lat: -77.359425054188, long: 38.958058116661 } },
    { coordinates: { lat: -77.10853099823, long: 38.880100922392 } },
  ];
  console.log(lon);
  console.log(lat);
  useEffect(() => {
    var geolocate = new mapboxgl.GeolocateControl();
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 13,
      center: [4.899, 52.372],
    });
    var directions = new MapboxDirections({
      accessToken: token,
      unit: "metric",
      profile: "mapbox/driving	",
    });
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
    locations.filter((item) => (
      new mapboxgl.Marker()
        .setLngLat([item.coordinates.lat, item.coordinates.long])
        .addTo(map)
    ));
    geolocate.on("geolocate", function (e) {
      var lon = e.coords.longitude;
      var lat = e.coords.latitude;
      setLon(lon);
      setLat(lat);
    });
    map.addControl(geolocate);
    map.addControl(directions, "top-left");
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    return () => map.remove(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="map-container" ref={mapContainer} />;
}
