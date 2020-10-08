import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './driverbooking.css'
import SetLocationEcoCenter from './Booking Step Components/setLocationEcoCenter';
import AvailabeDrivers from './Booking Step Components/availabeDrivers';
import BookDriver from './Booking Step Components/bookDriver';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));



function DriverBooking() {

    function getSteps() {
        return ['Set Location & Eco Center', 'Available Drivers', 'Book Driver'];
    }

    const [driverBookInfo,setDriverBookInfo] = useState({
        drivername:null,
        farmername:null,
        farmernumer:null,
        lat:null,
        lng:null,
        time:null,
        ecocenter:null
    })

    function locationEcoCenter(e){
        console.log(e)
    }

    function setdrivers(e){
        console.log(e)
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SetLocationEcoCenter locationEcoCenter={locationEcoCenter}/>;
            case 1:
                return <AvailabeDrivers  ecoCenter={driverBookInfo.ecocenter} setdrivers={setdrivers}/>;
            case 2:
                return <BookDriver />;
            default:
                return 'Unknown step';
        }
    }


    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
       

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="main" style={{width:'70vw'}}>
            <h2>Driver Booking</h2>
            <div className="box">
                <div className={classes.root}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                </Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                </Button>
                            </div>
                        ) : (
                                <div>
                                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                    <div>
                                        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                            Back
                  </Button>
                                        

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div></div>
        </div>
    );

}

export default DriverBooking

