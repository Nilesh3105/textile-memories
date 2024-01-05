'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import axios from 'axios';
import Modal from './Modal';
import { Drawer, Box } from '@mui/material';

const center = [20.5937, 78.9629]; // Coordinates for India

const Map = () => {
  const [pins, setPins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

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

  useEffect(() => {
    fetchPins();
    const interval = setInterval(() => {
      fetchPins();
    }, 120000); // Refresh every 2 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchPins = async () => {
    try {
      const response = await axios.get('http://piyusharma95.pythonanywhere.com/api/');
      setPins(response.data.data);
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  return (
    <>
      <MapContainer center={center} zoom={5} style={{ height: '100vh', width: '100wh' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pins.map((pin, index) => (
          <Marker key={index} position={[pin.lat, pin.long]}>
            <Popup>
              {pin.first} {pin.last}
              <br />
              {pin.text.substring(0, 50)}...
              <br />
              <audio controls>
                <source src={`http://jotform.com${pin.recording}`} type="audio/wav" />
              </audio>
              <button onClick={() => openModal(pin)}>Show More</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Drawer anchor="left" open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          width="500px"
          display="flex"
          role="presentation"
          // onClick={setModalOpen(false)}
          // onKeyDown={setModalOpen(false)}
        >
          <h2>Full Text</h2>
          <p>{selectedPin?.text}</p>
        </Box>
      </Drawer>
      {/* <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Full Text</h2>
        <p>{selectedPin?.text}</p>
      </Modal> */}
    </>
  );
};

export default Map;
