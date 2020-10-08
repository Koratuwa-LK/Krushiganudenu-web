import React, { useState, useEffect } from 'react'
import './setLocation.css'
import SimpleMap from './MapComponent'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));



function SetLocationEcoCenter(props) {


    useEffect(()=>{
        localStorage.setItem('ecocenter',"Dambulla")
    },[])

    const [ecoCenter, setEcoCenter] = React.useState('Dambulla');

    const [mapVisible, SetMapVisible] = useState(false);

    const [state,setState] = useState({
        ecocenter:"Dambulla",
        lat:null,
        lng:null,
    })

    const classes = useStyles();

    const handleChange = (event) => {
        setEcoCenter(event.target.value);
        setState({
            ...state,
            ecocenter:event.target.value
        })

        localStorage.setItem('ecocenter',event.target.value)
    };

    function SetEnableMap(){
        SetMapVisible(true)
    }

     function setLocation (e){
         setState({
            ...state,
            lat:e.lat,
            lng:e.lng
        })
        
        localStorage.setItem('lat',e.lat)
        localStorage.setItem('lng',e.lng)

    }

    return (
        <div className="main10" >

            <div className="main2">
                <div className="main21">
                    <InputLabel id="demo-simple-select-label">Select Eco Center</InputLabel>
                    <Select

                    fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.ecocenter}
                        onChange={handleChange}
                        
                    >
                        <MenuItem value='Dambulla'>Dambulla</MenuItem>
                        <MenuItem value='Meegoda'>Meegoda</MenuItem>

                    </Select>
                </div>
                <div className="main22">
                    <Button style={{ marginTop: '20px' }} variant="contained" color="primary" disableElevation onClick={SetEnableMap}>
                        Select Location
                </Button>
                </div>
            </div>
            <div className="main3">
                <div className="main4">
                    {mapVisible?<SimpleMap setLocation={setLocation}/>:<div></div>}
                </div>
            </div>
        </div>
    )
}

export default SetLocationEcoCenter