import React from "react";
import './ImageDisplay.css'
import Boxlist from "./Boxlist";

const ImageDisplay=({imageURL, box})=>{
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" alt="" src={imageURL} width={'500px'} />
                <Boxlist box={box}/>
            </div>
        </div>
    )
}
export default ImageDisplay;