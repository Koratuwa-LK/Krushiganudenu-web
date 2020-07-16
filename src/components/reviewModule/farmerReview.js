import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './farmerreview.css'
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import firebase from '../../firebase';
var moment = require('moment');

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles({
    root: {
        width: 200,
        display: 'flex',
        alignItems: 'center',

    },
});




function FarmerReview({uid}) {
    const [hover, setHover] = useState(-1);
    const classes = useStyles();
    const [state,setState]=useState({
        comment:'',
        name:'',
        rating:''
    })

    const [ratings,setRating]=useState()

    useEffect(()=>{
        
    },[])
    

    function handleInputChange(e){
        var {name,value}=e.target
        setState({
            ...state,
            [name]:value
        })
 
    }

    function handleFormSubmit(e){
        e.preventDefault();
        var timestamp = moment().unix();
        firebase.database().ref('Farmers/').child(`${uid}`).child('reviews').child(`${timestamp}`).set({
            ...state
        }).then((res)=>{
            console.log("Success")
        }).catch((error)=>{
            console.log(error)
        })
    }



    return (

        <div className="main">
            <div className="box">
                <Grid container spacing={5}
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={10} align="left">
                        <h3>Thushara</h3>
                    </Grid>

                    <Grid item xs={10} align="center">
                        <form noValidate autoComplete="off" onSubmit={handleFormSubmit}>


                            <Grid item xs={12} align="left">
                                <TextField  label="Your Review" fullWidth multiline name="comment" onChange={handleInputChange} value={state.comment}/>
                            </Grid>
                            <Grid item xs={12} align="left">
                                <TextField  label="Your Name" fullWidth name="name" onChange={handleInputChange} value={state.name}/>
                            </Grid>
                            <div style={{ marginTop: '20px' }}>
                                <Grid item xs={12} align="center">
                                    <Rating
                                        name="hover-feedback"
                                        value={state.rating}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            //setrating(newValue);
                                            setState({
                                                ...state,rating:newValue
                                            })

                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                    />
                                    {state.rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : state.rating]}</Box>}
                                </Grid>
                                <div style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} align="center">
                                        <Button variant="contained" color="primary" type="submit">
                                            Submit Review
                                    </Button>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} align="center">
                                        {/* <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={rating}
                                                    precision={0.5}
                                                    
                                                />
                                                
                                                <Typography color="textSecondary">
                                                    adjective
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    well meaning and kindly.
                                                <br />
                                                    {'"a benevolent smile"'}
                                                </Typography>
                                            </CardContent>
                                        </Card> */}
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        {/* <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={rating}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setrating(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                />
                                                <Typography color="textSecondary">
                                                    adjective
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    well meaning and kindly.
                                                <br />
                                                    {'"a benevolent smile"'}
                                                </Typography>
                                            </CardContent>
                                        </Card> */}
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        {/* <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={rating}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setrating(newValue);
                                                    }}
                                                    onChangeActive={(event, newHover) => {
                                                        setHover(newHover);
                                                    }}
                                                />
                                                <Typography color="textSecondary">
                                                    adjective
                                                </Typography>
                                                <Typography variant="body2" component="p">
                                                    well meaning and kindly.
                                                <br />
                                                    {'"a benevolent smile"'}
                                                </Typography>
                                            </CardContent>
                                        </Card> */}
                                    </Grid>
                                
                                </div>
                            </div>
                        </form>
                    </Grid>


                </Grid>
            </div>
        </div>

    )
}



export default FarmerReview

