  // import {useState , useEffect} from "react"
import './PageHead.css'
const PageHead = ()=>{
console.log('from page head')
    return (
        <header id="pagehead-container">
            <span id='Total-contacts-heading'>Total Contacts</span>
            <input id='inputbar' placeholder='Search by Email Id.....'/>

            <div id='user-imfo'>
                <div id='user-image-container'>
                    <img id='user-image' src='./userImage/download.jfif' alt ='user'/>
                </div>
                <div id='user-name-container'>
                    <p> <b>Ram Darvin</b></p> 
                    <p> Super Adimn</p> 
                </div>
            </div>
            <div id='end-line'></div>
        
        </header>
    )
}
export default PageHead;