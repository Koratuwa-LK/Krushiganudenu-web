import React, { useState } from 'react'
 
import MapPicker from 'react-google-map-picker'
 
const DefaultLocation = { lat: 10, lng: 106};
const DefaultZoom = 10;
 
const SimpleMap = () => {
 
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
 
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
 
  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }
 
  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }
 
  return (
    <>
    
  <button hidden onClick={handleResetLocation}>Reset Location</button>
  <label hidden>Latitute:</label><input hidden type='text' value={location.lat} disabled/>
  <label hidden>Longitute:</label><input hidden type='text' value={location.lng} disabled/>
  <label hidden>Zoom:</label><input hidden type='text' value={zoom} disabled/>
  
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    style={{height:'300px', width:'400px'}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyDewaIsAoFotZlKUM43e5etqeqVqMPryyc'/>
  </>
  );
}
 
export default SimpleMap