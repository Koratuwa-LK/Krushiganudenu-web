import React, { useState,useEffect } from 'react'
 
import MapPicker from 'react-google-map-picker'
 
const PureDefaultLocation = { lat: 7, lng: 81};
const DefaultZoom = 10;
 
const SimpleMap = (props) => {


 
  const [defaultLocation, setDefaultLocation] = useState(PureDefaultLocation);
 
  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);


  useEffect(() => {
   
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);

      setDefaultLocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
      props.setLocation({lat:position.coords.latitude, lng:position.coords.longitude});
     
    });
  }, [])
 
  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
    props.setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }
 
  function handleResetLocation(){
    setDefaultLocation({ ...defaultLocation});
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