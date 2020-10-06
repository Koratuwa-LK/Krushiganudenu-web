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
    const [ecoCenter, setEcoCenter] = React.useState('Dambulla');

    const classes = useStyles();

    const handleChange = (event) => {
        setEcoCenter(event.target.value);
    };

    return (
        <div className="main1" >

            <div className="main2">
                <InputLabel id="demo-simple-select-label">Select Eco Center</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ecoCenter}
                    onChange={handleChange}
                    autoWidth
                >
                    <MenuItem value={10}>Dambulla</MenuItem>
                    <MenuItem value={20}>Meegoda</MenuItem>

                </Select>
                <Button style={{marginTop:'20px'}}variant="contained" color="primary" disableElevation>
                    Select Location
                </Button>

            </div>
            <div className="main3">
                <div className="main4">
                    <SimpleMap />
                </div>

            </div>
        </div>
    )
}

export default SetLocationEcoCenter