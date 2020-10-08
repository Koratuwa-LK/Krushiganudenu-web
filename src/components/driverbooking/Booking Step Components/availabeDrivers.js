import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase';
import './availableDrivers.css'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '50%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: '#000000',
        textDecoration: 'none',
        
    },
}));


function AvailabeDrivers(props) {


    const classes = useStyles();

    const [drivers, setDriver] = useState({ driverList: [] })

    useEffect(() => {
        firebase.database().ref(`drivers/`).on("value", snapshot => {

            let tempDrivers = [];

            const driverObjects = snapshot.val()
            console.log(localStorage.getItem('ecocenter'))
            for (let key in driverObjects) {

                console.log(driverObjects[key]['nearest_eco_center'])
                if (driverObjects[key]['nearest_eco_center'] === localStorage.getItem('ecocenter')) {
                    tempDrivers.push({
                        driver: driverObjects[key],
                        driverId: key
                    })
                }

            }

            console.log(tempDrivers)
            setDriver({
                driverList: tempDrivers
            })
        })

    }, [])


    function selectDriver(e){
        localStorage.setItem('first_name',e.first_name)
        localStorage.setItem('last_name',e.last_name)
        localStorage.setItem('maximam_weight_can_carry',e.maximam_weight_can_carry)
        localStorage.setItem('vehicle_color',e.vehicle_color)
        localStorage.setItem('email',e.email)
        localStorage.setItem('nic_no',e.nic_no)
        localStorage.setItem('nearest_eco_center',e.nearest_eco_center)
    }

    return (
        <div className="main1" >



            {
                drivers.driverList.map(val => {
                    return (
                        <div key={val.driverId}>
                            <div className={classes.root}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1c-content"
                                        id="panel1c-header"
                                    >
                                        <div className={classes.column}>
                    <Typography className={classes.heading}>{val.driver.first_name} {val.driver.last_name}</Typography>
                                        </div>
                                        <div className={classes.column} hidden>
                                            <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.details}>



                                        <div className={classes.column}>
                                            <Typography variant="caption">
                                                Vehicle Type : {val.driver.vehicle_type}
                                                <br />
                                                Meximam Weight Can Carry : {val.driver.maximam_weight_can_carry}
                                                <br />
                                                Vehicle Color : {val.driver.vehicle_color}
                                                <br />
                                                Vehicle Plate No : {val.driver.vehicle_plate_no}
                                                <br />
                                               
                                            </Typography>
                                        </div>
                                        <div className={clsx(classes.column, classes.helper)}>
                                            <Button variant="outlined" color="secondary" onClick={()=>selectDriver(val.driver)}>
                                                Book This Driver
                                            </Button>

                                        </div>
                                    </AccordionDetails>
                                    <Divider />

                                </Accordion>
                            </div>
                        </div>
                    )
                }
                )
            }


        </div>
    )
}

export default AvailabeDrivers