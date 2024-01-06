'use client';

import MapCore from "./MapCore"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SwipeableDrawer, Box, styled, Typography, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));


const Map = () => {
  const [pins, setPins] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  const fetchPins = async () => {
    try {
      const response = await axios.get('https://piyusharma95.pythonanywhere.com/api/');
      setPins(response.data.data);
    } catch (error) {
      console.error('Error fetching pins:', error);
    }
  };

  useEffect(() => {
    fetchPins();
    const interval = setInterval(() => {
      fetchPins();
    }, 120000); // Refresh every 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (<>
    <CssBaseline />
    <Global
      styles={{
        '.MuiDrawer-root > .MuiPaper-root': {
          height: `calc(50% - ${drawerBleeding}px)`,
          overflow: 'visible',
        },
      }}
    />
    <MapCore pins={pins} setModalOpen={setModalOpen} setSelectedPin={setSelectedPin}/>
    <SwipeableDrawer
      anchor="bottom"
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      className="max-w-md"
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <StyledBox
        sx={{
          position: 'absolute',
          top: -drawerBleeding,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: 'visible',
          right: 0,
          left: 0,
        }}
      >
        <Puller />
        <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
      </StyledBox>
      <StyledBox
        sx={{
          px: 2,
          pb: 2,
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Skeleton variant="rectangular" height="100%" />
      </StyledBox>
        {/* <h2>{selectedPin?.first} {selectedPin?.last}</h2>
        <p>{selectedPin?.text}</p>
        <audio controls>
          <source src={`http://jotform.com${selectedPin?.recording}`} type="audio/wav" />
        </audio> */}
    </SwipeableDrawer>
  </>)
}


export default Map;