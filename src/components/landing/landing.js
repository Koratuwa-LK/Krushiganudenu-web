import React, { useContext, useState } from 'react';
import styles from './landing.module.css';
// import img from '../../assets/svg 1.png';
// import img from '../../assets/undraw_nature_m5l.svg';
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

function Landing() {

    const { t, i18n } = useTranslation();
    const [lang, setlang] = useState('')

    const { currentUser } = useContext(AuthContext);

    function changelang(e) {
        setlang(e.target.value)
        i18n.changeLanguage(e.target.value)
    }

    const [age, setAge] = React.useState('');


    return (


        <div className={styles.main}>

            <div className={styles.hold}>
                <img src={img}></img>
            </div>
            <nav>
                <ul className={styles.navlinks}>
                    <li>{t('home')}</li>
                    <li><a href="/store">{t('marketplace')}</a></li>
                    <li>{t('aboutus')}</li>

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
                        <li style={{ cursor: "pointer" }} onClick={() => app.auth().signOut()}><ExitToAppIcon /></li>
                    }
                </ul>

            </nav>

            <div className={styles.slug}>
                <h1>KRUSHIGANUDENU.LK</h1>
                <p>krushiganudenu krushiganudenu krushiganudenu krushiganudenu krushiganudenu krushiganudenu</p>
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


            <div className={styles.btn2}>

                <h4><a href="/request">{t('stockrequest')}</a></h4></div>

        </div>
    )
}


export default Landing;