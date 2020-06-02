import React from 'react';
import Aux from './../../../hoc/Auxilary';
import './BackDrop.css';

const backDrop = props =>{
    let combinedClasses = ['backdrop'].join(' ') ;
    if (!props.showBackDrop){
        combinedClasses =  ['backdrop','backHide'].join(' ');
    }
    return (
        <Aux>
            <div  className={combinedClasses} onClick={props.clicked}>
            </div>
        </Aux>
    );
}
export default backDrop;
