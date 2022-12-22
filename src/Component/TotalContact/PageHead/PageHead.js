// import {useState , useEffect} from "react"
import './PageHead.css'
const PageHead = ()=>{

    return (
        <header id="pagehead-container">
            <span id='Total-contacts-heading'>Total Contacts</span>
            <input id='inputbar' placeholder='Search by Email Id.....'/>

            <div id='user-imfo'>
                <div id='user-image-container'>
                    <img id='user-image' src='' alt ='user'/>
                </div>
                <div id='user-name-container'>
                    <p> Ram Darvin</p> 
                    <p> Super Adimn</p> 
                </div>
            </div>
            <div id='end-line'></div>
        
        </header>
    )
}
export default PageHead;