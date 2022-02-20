import react from "react";
import Boundingbox from "./Boundingbox";

const Boxlist =({box})=>{

    return(
        <div>{
            box.map((data, i)=>{
                return <Boundingbox key={i} individualBox={box[i]}/>
            })
        }
        </div>
    );
}
export default Boxlist;