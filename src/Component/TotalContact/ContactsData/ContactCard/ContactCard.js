// import React, { Component }  from 'react';
import {useState } from "react"
import './ContactCard.css'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import {useContext} from 'react'
import { contextProvider } from "../../../../App";
import { selectContactsContext } from '../../../../App';
const url="https://contact-manager-app-backend.onrender.com/api/contacts"
const ContactCard = (props)=>{
    // console.log(props.data.obj)
    let dualId = '';
    if(props.data.i % 2 === 0){
        dualId = 'dual-tone'
    }
    const [loader, setLoader] = useState(false)
    const [deleteOne, setDeleteOne] = useState(false)
    const [response, setResponse] = useState({})
    const [contactsArr, setContactsArr] = useContext(contextProvider)
    const {selected,_id, name,designation,company,industry,email,phoneNumber, country} = props.data.obj
    const [selectOne, setSelectOne] = useState(selected)

    // console.log(name,_id)
    const handleSelectOne=(event)=>{
        setSelectOne(!selectOne)
            if(!selectOne){
                setContactsArr(contactsArr.map((contacts,i)=>{return contacts._id==_id?{...contacts,selected:true}:contacts}))
                // setSelectContacts((prev)=>{console.log(prev);return [...prev,_id]})
            }else{
                setContactsArr(contactsArr.map((contacts,i)=>{return contacts._id==_id?{...contacts,selected:false}:contacts}))
                // setSelectContacts((prev)=>{console.log(prev);return prev.filter((e)=>e!==_id)})
            }
        console.log("contact card",contactsArr.filter((contact)=>{if(contact.selected)return contact._id}))
    }
    // console.log("contactArr in contact card",contactsArr)
    // useEffect(()=>{
    //     setChecked(false)
    // },[])
    console.log("contact card",contactsArr.filter((contact)=>{if(contact.selected)return contact._id}))

    function handleDelete(){
        setLoader(true)
        fetch(url,{
                method: 'DELETE',
                headers: {Authorization: localStorage.getItem('token'),'Content-type': 'application/json'},
                body: JSON.stringify({selectedContactsIds:_id})
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
                    .finally(()=>{setDeleteOne(false);setLoader(false)})
                }
            })
            .catch((e)=>{console.log("fetch call error",e)})
            .finally(()=>{})
            
    }
    return (
        <tbody id={dualId}>  
                    {loader&&<div className="loader-img"><img src="./images/Loading_icon.gif" alt="loading_icon.gif"/></div>}         
            <tr id="tabledata-card" style={deleteOne?{backgroundColor:"rgba(255, 0, 0, 0.2)"}:{}}>
                <td id='namefild'> 
                    <input type='checkbox' 
                    onChange={handleSelectOne} 
                    checked={selected} 
                    /><p className="for-incrise-the-padding-of-data">{name}</p>
                </td>
                <td id='desiggnationfild'>
                    <p>{designation}</p>
                </td>
                <td id='companyfild'>
                    <p>{company}</p>
                </td>
                <td id='industryfild'>
                    <p>{industry}</p>
                </td>
                <Tooltip 
                id="tooltio-text"
                title={`${email}`} 
                arrow style={{"colur":"#ffff"}}>
                <td id='email'>
                
                    <p >{email}</p>
                    <button></button>
                
                </td>
                </Tooltip>
                <td id='phonenofild'>
                    <p>{phoneNumber}</p>
                    </td>
                <td id='countryfild'>
                    <p>{country}</p>
                    </td>
                <td id='actionfild'>
                    {deleteOne?<button style={{backgroundColor:"none",border:"none",}} onClick={handleDelete}>{loader?<img width="20px" src="./images/Loading_icon.gif"/>:<img width="20px" src="./images/tickIcon.png"/>}</button>:<button><ModeEditOutlineOutlinedIcon/></button>}
                    {deleteOne?<button style={{backgroundColor:"none",border:"none",marginLeft:"10px"}} onClick={()=>{setDeleteOne(false)}}><img width="15px" src="./images/crossIcon.png"/></button>:<button onClick={()=>{setDeleteOne(true)}}><DeleteOutlineOutlinedIcon style={{ color: "red" }}/></button>}
                </td>
            </tr>
        </tbody>      
        
    )
}
export default ContactCard;
