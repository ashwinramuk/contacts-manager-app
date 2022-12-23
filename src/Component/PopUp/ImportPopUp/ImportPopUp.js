import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ImportPopUp = (props) =>{
    // useEffect(()=>{

    // },[])
    const [response, setResponse] = useState(null)
    const [loader, setLoader]=useState(false)
    function handleDrop(url, file){
        const formData = new FormData();
        formData.append('file',file)
        setLoader(true)
        fetch(url,{
                method: 'POST',
                headers: {Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3ODM4NDcsImRhdGEiOiI2M2EzNTFhNmI2Y2I2Mjc4NmJkYzYyYWUiLCJpYXQiOjE2NzE3ODAyNDd9.V0_pz7q3tu5NDroRe-BjYAg2VKjnLgQNyERrwV7zUHY"},
                body: formData
            }).then((res)=>res.json())
            .then((data)=>{console.log(data);setResponse(data)})
            .catch((e)=>{console.log("fetch call error",e)})
            .finally(()=>{setLoader(false)})
        
    }
    function closePopUp(){
        props.setTrigger((previous)=>{return ({...previous,importPopUp:false})})
    }
    
    return (props.trigger)?(
        <div 
        className="popup-importFile" 
        // onDragEnter={(event)=>{
        //     event.preventDefault();
        //     console.log("dragEnter")
        //     event.currentTarget.classList.add('popup-importFile-dragEnter')
        // }}
        onDragLeave={(event)=>{
            event.preventDefault();
            console.log("dragLeave")
            event.currentTarget.classList.remove('popup-importFile-dragEnter')
        }}
        onDragOver={(event)=>{
            event.preventDefault();
            console.log("dragOver");
            event.currentTarget.classList.add('popup-importFile-dragEnter')    
        }} 
        onDrop={(event)=>{
            event.preventDefault();
            event.currentTarget.classList.remove('popup-importFile-dragEnter')
            let files = event.dataTransfer.files[0]
            console.log(files);
            handleDrop("https://contact-manager-app-backend.onrender.com/api/contacts", files)
        }}>
            <div className="popup-icon-cover">{response==null?<img src='./images/importFileIcon.png' alt='importFileIcon'/>:response.status=="Success"?<img src='./images/tickIcon.png' alt='tickIcon'/>:<img src='./images/crossIcon.png' alt='crossIcon'/>}</div>
            {!loader?<><h2 className="popup-title">{response==null?"Import File":response.status=="Success"?"Import Complete":"Import Failed"}</h2>
            <p className="popup-msg">{response==null?"Drag & Drop a CSV File to Upload":response.status=="Success"?"CSV File is Uploaded":response.message=="jwt expired"?"Session Expired":response.message}</p></>:<img className="loader-img" src="./images/Loading_icon.gif" alt="Loading_icon.gif"></img>}
            {/* {response==null?"":response.message=="jwt expired"?<p className="popup-msg">Please <Link to="/login">Login</Link> again</p>:""} */}

            {response==null?<button className="popup-cancel-btn" onClick={closePopUp}>Cancel</button>:response.status=="Success"?<button className="popup-cancel-btn" onClick={closePopUp}>Close</button>:response.message="jwt expired"?<button className="popup-cancel-btn" onClick={closePopUp}><Link to="/login">Login</Link></button>:""}
        </div>
    ):""
}
export default ImportPopUp;