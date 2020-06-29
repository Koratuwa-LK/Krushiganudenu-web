
import TextField from '@material-ui/core/TextField';
import React,{useState} from 'react'
import axios from '../stocks-list';
import { storage } from '../firebase';
import LinearProgress from '@material-ui/core/LinearProgress';

function Farmer() {

    const [details, setDetails] = useState({
        vege:"",
        quantity:"",
        seller:"",
        eco_centre:""
    })

    const [image, setImage] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    const [progress, setProgress] = useState(0)

    function handleInputChange(e){
        setDetails({
            ...details,
            [e.target.name]:e.target.value
        })
        console.log(details)
    }

    function handleSubmit(e){
        e.preventDefault();

        const data = {
            ...details,
            quantity:parseInt(details.quantity),
            img:imgUrl
        }
        
        axios.post('/stocks.json',
        data
        ).then(res=>{
            console.log(res);
        })
    }

    function addImage(e){
        
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }

    }

    function handleUpload(e){
        e.preventDefault()
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            snapshot=>{
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            error=>{
                console.log(error);
            },
            ()=>{
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        setImgUrl(url)
                    })
            }
        )
    }

    return (
        <div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField label="Vegetable Type" name="vege" onChange={handleInputChange}/>
                <TextField label="Quantity" name="quantity" onChange={handleInputChange}/>
                <TextField label="seller" name="seller" onChange={handleInputChange} />
                <TextField label="Eco Center" name="eco_centre" onChange={handleInputChange} />
                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={handleUpload}>
            <input type="file" onChange={addImage}/>
            
            <LinearProgress  variant="determinate" value={progress} />
            <input type="submit" value="Upload" />
            </form>
        </div>
    );
}

export default Farmer;


