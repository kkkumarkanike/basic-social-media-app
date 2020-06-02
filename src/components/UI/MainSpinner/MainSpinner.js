import React from "react";
import './MainSpinner.css';

const mainSpinner = props =>{
    return(
           <div className="spinner">
               <div className="lds-ring">
                   <div></div>
                   <div></div>
                   <div></div>
                   <div></div>
               </div>
           </div>
    );
}


export default mainSpinner;