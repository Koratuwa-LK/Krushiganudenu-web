import React, { useContext, useState } from 'react';
import styles from './landing.module.css';
import img from '../../assets/landing.svg';
import app from '../../firebase'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../Auth";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useTranslation } from 'react-i18next';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import imgback from '../../assets/2562092.jpg';
import Modal from '@material-ui/core/Modal';
import OrderHistory from '../Order/orderHistory';
import DriverBooking from '../driverbooking/driverBooking';

function Landing() {

    const { t, i18n } = useTranslation();
    const [lang, setlang] = useState('')

    const { currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false)
    const [openDriverBooking, setOpenDriverBooking] = useState(false)

    function changelang(e) {
        setlang(e.target.value)
        i18n.changeLanguage(e.target.value)
    }

    const [age, setAge] = React.useState('');

    function handleOpen() {
        setOpen(true)
    };

    function handleClose() {
        setOpen(false)
    };

    function handleOpenDriverModal() {
        setOpenDriverBooking(true)
    };

    function handleCloseDriverModal() {
        setOpenDriverBooking(false)
    };


    return (


        <div>
            <Modal style={{
                top: '20%',
                left: '30%',
                right: '30%',
                bottom: '20%',

            }}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >

                <OrderHistory />
            </Modal>
            <Modal style={{
                top: '20%',
                left: '15%',
                right: '15%',
                bottom: '20%',

            }}
                open={openDriverBooking}
                onClose={handleCloseDriverModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >

                < DriverBooking handleCloseDriverModal={handleCloseDriverModal}/>
            </Modal>
            <div className={styles.responsive}>
                <div className={styles.imgresponse}>
                    <img className={styles.imgresponseimg} src="https://images.unsplash.com/photo-1503762687835-129cc7a277e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1576&q=80" ></img>
                </div>
                <div className={styles.textresponse}>

                    <h2 style={{ color: '#55e05f' }}>KrushiGanudenu</h2>


                    <div className={styles.btnresponse}>
                        <h4>
                            <Link to="/login">
                                <a>SIGN IN</a>
                            </Link>
                        </h4>

                    </div>

                    <div className={styles.btnresponse}>
                        <h4>
                            <Link to="/store">
                                <a>MARKETPLACE</a>
                            </Link>
                        </h4>

                    </div>


                    <div className={styles.btnresponse}>
                        <h4>
                            <Link to="/request">
                                <a>STOCK REQUEST</a>
                            </Link>
                        </h4>

                    </div>



                    <div className={styles.btnresponse}>
                        <h4>
                            <Link to="/croplocations">
                                <a>GROWERS IN THE ISLAND</a>
                            </Link>
                        </h4>

                    </div>
                </div>
            </div>

            <div className={styles.main}>

                <div className={styles.hold}>
                    <img src={img}></img>
                </div>
                <nav>
                    <ul className={styles.navlinks}>

                        <li><a href="/store" style={{ color: '#3F3F8F' }}>{t('marketplace')}</a></li>

                        {currentUser != null &&

                            <li onClick={handleOpen} style={{ cursor: 'pointer', color: '#3F3F8F' }}>ORDERS</li>
                        }
                        {currentUser != null &&
                            <li onClick={handleOpenDriverModal} style={{ cursor: 'pointer', color: '#3F3F8F' }}>DRIVERS</li>
                        }
                        <li><a href="/aboutus" style={{ color: '#3F3F8F' }}>{t('aboutus')}</a></li>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lang}
                            onChange={changelang}
                        >
                            <MenuItem value='en'>English</MenuItem>
                            <MenuItem value='sn'>සිංහල</MenuItem>
                        </Select>

                        {currentUser !== null &&
                            <li style={{ cursor: "pointer" }} onClick={() => app.auth().signOut()}>
                                <Tooltip title={t('logout')}>
                                    <ExitToAppIcon />
                                </Tooltip>
                            </li>
                        }
                    </ul>

                </nav>

                <div className={styles.slug}>
                    <h1>KRUSHIGANUDENU.LK</h1>
                    <p style={{ fontSize: 16, padding: 20, lineHeight: 2 }}>Online marketplace where farmers & buyers can meet bypassing all the physical barriers.Competitive prices & quick sell out is our promise.</p>
                </div>



                {currentUser === null &&
                    <div className={styles.btn}>
                        <h4>
                            <Link to="/login">
                                <a>SIGN IN</a>
                            </Link>
                        </h4>

                    </div>


                }



                <div className={styles.btn4}>
                    <h4>
                        <Link to="/croplocations">
                            <a>GROWERS IN THE ISLAND</a>
                        </Link>
                    </h4>
                </div>





                <div className={styles.btn2}>

                    <h4><a href="/request">{t('stockrequest')}</a></h4></div>

            </div>


        </div>
    )
}


export default Landing;