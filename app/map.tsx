"use client";
import { useState, StrictMode, useRef, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const MapData = () => {
  const [viewState, setViewState] = useState({
    longitude: 88.363892,
    latitude: 22.572645,
    zoom: 10,
  });

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const geoControlRef = useRef<mapboxgl.GeolocateControl>();
  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  return (
    <StrictMode>
      <div>
        <DeckGL
          style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
          viewState={viewState}
          // @ts-ignore
          onViewStateChange={({ viewState }) => setViewState(viewState)}
          controller={true}
          layers={[]}
        >
          <Map
            // @ts-ignore
            mapLib={maplibregl}
            mapStyle="https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json"
            transformRequest={(url, resourceType) => {
              if (url.includes("?")) {
                url = url + "&api_key=q7moNURUtRfP3bz5o8qP1NGLOsDbVWM9T5KW9a42";
              } else {
                url = url + "?api_key=q7moNURUtRfP3bz5o8qP1NGLOsDbVWM9T5KW9a42";
              }
              return { url, resourceType };
            }}
          >
            <Marker
              latitude={22.5751}
              longitude={88.3589}
              onClick={() => setShowPopup(true)}
            />
            <NavigationControl />
            <GeolocateControl
              ref={geoControlRef}
              style={{ cursor: "pointer" }}
            />
            {showPopup && (
              <Popup
                longitude={-100}
                latitude={40}
                anchor="bottom"
                onClose={() => setShowPopup(false)}
              >
                You are here
              </Popup>
            )}
          </Map>
        </DeckGL>
      </div>
    </StrictMode>
  );
};

export default Map;

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//     <StrictMode>
//         <App />
//     </StrictMode>
// );
