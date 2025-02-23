// display the map
// arrange the routine
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const MapDisplay = ({ addresses }) => {
  const [response, setResponse] = useState(null);
  // the center is Dublin
  const center = { lat: 53.349805, lng: -6.26031 };

  useEffect(() => {
    if (!window.google || addresses.length < 2) return;
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: addresses[0],
        destination: addresses[addresses.length - 1],
        waypoints: addresses
          .slice(1, -1)
          .map((address) => ({ location: address, stopover: true })),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") setResponse(result);
      }
    );
  }, [addresses]);

  return (
    // <LoadScript googleMapsApiKey="AIzaSyCUCmqXsJ_v1Kw5o0J9l7ldoediZql5ooo">
    <GoogleMap
      mapContainerStyle={{ width: "600px", height: "600px" }}
      center={center}
      zoom={12}
    >
      {response && <DirectionsRenderer directions={response} />}
    </GoogleMap>
    // </LoadScript>
  );
};

MapDisplay.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.string).isRequired, // ✅ 添加 prop-types 校验
};

export default MapDisplay;
