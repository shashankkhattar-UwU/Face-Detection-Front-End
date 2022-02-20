import react from "react";

const Boundingbox=({individualBox})=>{
    return(
        <div>
            <div className="bounding-box" style={{top: individualBox.topRow, right: individualBox.rightCol, bottom: individualBox.bottomRow, left: individualBox.leftCol}}></div>
        </div>
    );
}
export default Boundingbox;