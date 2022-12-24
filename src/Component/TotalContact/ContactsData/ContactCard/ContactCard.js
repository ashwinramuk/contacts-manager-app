
import React, { Component }  from 'react';

import {useState , useEffect} from "react"
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
    const [selectAll, setSelectAll] = props.selectAll
    const [checked, setChecked] = useState(false)
    const [loader, setLoader] = useState(false)
    const [response, setResponse] = useState({})
    const [contactsArr, setContactsArr] = useContext(contextProvider)
    const [selectContacts,setSelectContacts] = useContext(selectContactsContext)
    const {_id, name,designation,company,industry,email,phoneNumber, country} = props.data.obj
    // console.log(name,_id)
    const handleSelect=(event)=>{
        setChecked(prev=>!prev) 
        if((selectAll^(!checked))){
            setSelectContacts((prev)=>{console.log(prev);return [...prev,_id]})
        }else{
            setSelectContacts((prev)=>{console.log(prev);return prev.filter((e)=>e!==_id)})
        }    
    }
    console.log("selectContacts",selectContacts)
    // useEffect(()=>{
    //     setChecked(false)
    // },[])
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
                    .finally(()=>{})
                }
            })
            .catch((e)=>{console.log("fetch call error",e)})
            .finally(()=>{setLoader(false);setSelectContacts([])})
            
    }
    return (
        <tbody id={dualId}>   
        {/* <Tooltip title={{email}} arrow>    */}
            <tr >
                <td id='namefild'> <input type='checkbox' onChange={handleSelect} checked={(selectAll^checked)} />{name}</td>
                <td id='desiggnationfild'>{designation}</td>
                <td id='companyfild'>{company}</td>
                <td id='industryfild'>{industry}</td>
                <Tooltip title={`${email}`} arrow style={{"colur":"#ffff"}}>
                <td id='email'>
                
                    {email}
                    <button></button>
                
                </td>
                </Tooltip>
                <td id='phonenofild'>{phoneNumber}</td>
                <td id='countryfild'>{country}</td>
                <td id='actionfild'>
                    <button><ModeEditOutlineOutlinedIcon/></button>
                    <button onClick={handleDelete}><DeleteOutlineOutlinedIcon/></button>
                    {loader&&<img className="loader-img" src="./images/Loading_icon.gif" alt="loading_icon.gif"/>}
                </td>
            </tr>
        {/* </Tooltip>            */}
        
        </tbody>      
        
    )
}
export default ContactCard;
