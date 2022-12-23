// import {useState , useEffect} from "react"
import React from "react";
import SideBar from "./SideBar/SideBar";
import PageHead from "./PageHead/PageHead";
import ContactsData from "./ContactsData/ContactsData";
const TotalContact = ()=>{

    return (
        <>
        <SideBar/>
        <PageHead/>
        <ContactsData/>         
        </>
    )
}
export default TotalContact;