const Dots = () => {
    let dot = [1,2,3,4,5,6]
    return (
        <>
            {dot.map((i)=>
            <span className="dot" key={i}></span>
            )}
        </>
    )
}
export default Dots