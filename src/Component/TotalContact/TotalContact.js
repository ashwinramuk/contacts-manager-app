// import {useState , useEffect} from "react"
import React from "react";
import SideBar from "./SideBar/SideBar";
import PageHead from "./PageHead/PageHead";
import ContactsData from "./ContactsData/ContactsData";
import { useState } from "react";
const TotalContact = ()=>{
const [searchData, setSearchData] = useState([])
const getSearchData = (data)=>{
    setSearchData(data)
}
    return (
        <>
        <SideBar/>
        <PageHead getSearchData={getSearchData} />
        <ContactsData searchData={searchData}/>         
        </>
    )
}
export default TotalContact;