import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

const center = [20.5937, 78.9629]; // Coordinates for India

const MapCore = ({pins, setSelectedPin, setModalOpen}) => {
  const openModal = (pin) => {
    setSelectedPin(pin);
    setModalOpen(true);
  };

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
        iconUrl: 'leaflet/images/marker-icon.png',
        shadowUrl: 'leaflet/images/marker-shadow.png',
      });
    })();
  }, []);

  return (
    <>
      <MapContainer center={center} zoom={5} style={{ height: '100vh', width: '100wh' }}>
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        {/* <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {/* <TileLayer
          url="http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://stamen.com">Stamen Design</a>'
        /> */}
        {pins.map((pin, index) => (
          <Marker key={index} position={[pin.lat, pin.long]}>
            <Popup >
              {pin.first} {pin.last}
              <br />
                {pin.text.substring(0, 100)}...  <button onClick={() => openModal(pin)} className="underline hover:underline-offset-2 inline">Show More</button>
              <br />
              <audio controls>
                <source src={`http://jotform.com${pin.recording}`} type="audio/wav" />
              </audio>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapCore;
