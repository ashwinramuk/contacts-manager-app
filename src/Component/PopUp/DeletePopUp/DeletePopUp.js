const DeletePopUp = (props) =>{
    return (props.trigger)?(
        <div>
            <p>Are you sure to delete these contacts?</p>
            <button onClick={()=>{props.setTrigger((previous)=>{return ({...previous,deletePopUp:false})})}}>close</button>
        </div>
    ):""
}
export default DeletePopUp;