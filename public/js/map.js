maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element in which the SDK will render the map
  style: maptilersdk.MapStyle.STREETS,
  center: coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
  navigationControl: false,
  geolocateControl: false,
});

// Create a popup
const popup = new maptilersdk.Popup({ offset: 25 }) // Optional offset for styling
  .setHTML(
    `<h4>${title}</h4><p>Exact location will be provided after booking</p>`
  );

const marker = new maptilersdk.Marker({
  anchor: "bottom",
})
  .setLngLat(coordinates)
  .setPopup(popup)
  .addTo(map);
