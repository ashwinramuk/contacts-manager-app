import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useContext} from 'react'
import { contextProvider } from "../../../App"; 
import { selectContactsContext } from "../../../App"; 
const url = process.env.REACT_APP_API_BASE_URL+"/api/contacts"

const DeletePopUp = (props) =>{
    const [contactsArr,setContactsArr] = useContext(contextProvider)
    const [response, setResponse] = useState(null)
    const [loader, setLoader]=useState(false)
    function handleDelete(){
        let deleteContactIds = contactsArr.filter((contacts)=>{if(contacts.selected!==undefined&&contacts.selected)return contacts._id})
        console.log("deletePopUp",deleteContactIds)
        setLoader(true)
        fetch(url,{
                method: 'DELETE',
                headers: {Authorization: localStorage.getItem('token'),'Content-type': 'application/json'},
                body: JSON.stringify({selectedContactsIds:deleteContactIds})
            }).then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                setResponse(data)
                if(data.status=="Success"){
                    fetch(url,{
                        method: 'GET',
                        headers: {Authorization: localStorage.getItem("token")},
                    }).then((res)=>res.json())
                    .then((data)=>{console.log(data);setContactsArr(data.allcontact)}) 
                    .catch((e)=>{console.log("fetch call error",e)})
                    .finally(()=>{})
                }
            })
            .catch((e)=>{console.log("fetch call error",e)})
            .finally(()=>{setLoader(false);})
            
    }
    function closePopUp(){
        props.setTrigger((previous)=>{return ({...previous,deletePopUp:false})})
    }
    
    return (props.trigger)?(
        <div className="popup-importFile">
            <div className="popup-icon-cover">{response==null?<img src='./images/deleteIcon.png' alt='importFileIcon'/>:response.status=="Success"?<img src='./images/tickIcon.png' alt='tickIcon'/>:<img src='./images/crossIcon.png' alt='crossIcon'/>}</div>
            {!loader?<><h2 className="popup-title">{response==null?"Delete Contacts":response.status=="Success"?"Deleted Contacts":"Deletion Failed"}</h2>
            <p className="popup-msg">{response==null?"Sure you want to delete these contacts?":response.status=="Success"?"success":response.message=="jwt expired"?"Session Expired":response.message}</p></>:<div className="loader-div"><img className="loader-img" src="./images/Loading_icon.gif" alt="Loading_icon.gif"></img></div>}
            {loader&&<div style={{display:"hidden",height:"106px",}}></div>}
            {response==null?<div className="delete-popup-btns"><button className="popup-cancel-btn" onClick={closePopUp}>Cancel</button><button className="popup-ok-btn" onClick={handleDelete}>Ok</button></div>:response.status=="Success"||response.message=="No contacts selected"?<button className="popup-cancel-btn" onClick={closePopUp}>Close</button>:response.message="jwt expired"?<button className="popup-cancel-btn" onClick={closePopUp}><Link className="link" to="/login">Login</Link></button>:""}
        </div>
    ):""
}
export default DeletePopUp;