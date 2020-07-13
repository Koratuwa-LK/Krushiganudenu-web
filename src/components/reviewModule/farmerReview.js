import React, { useState } from 'react'
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

function FarmerReview(props) {
    const [value, setValue] = useState(2);
    const [hover, setHover] = useState(-1);
    const classes = useStyles();

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
                        <form noValidate autoComplete="off">


                            <Grid item xs={12} align="left">
                                <TextField id="standard-basic" label="Your Review" fullWidth multiline />
                            </Grid>
                            <Grid item xs={12} align="left">
                                <TextField id="standard-basic" label="Your Name" fullWidth />
                            </Grid>
                            <div style={{ marginTop: '20px' }}>
                                <Grid item xs={12} align="center">
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={0.5}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                    />
                                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                                </Grid>
                                <div style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} align="center">
                                        <Button variant="contained" color="primary">
                                            Submit Review
                                    </Button>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Grid item xs={12} align="center">
                                        <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={value}
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
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={value}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
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
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        <Card variant="outlined">
                                            <CardContent>

                                                <Rating
                                                    name="hover-feedback"
                                                    value={value}
                                                    precision={0.5}
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
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
                                        </Card>
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

