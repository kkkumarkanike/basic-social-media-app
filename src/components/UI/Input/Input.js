import React from "react";
import './Input.css';


const input = props =>{
    const style = {
        ':focus': {
            backgroundColor : "black"
        }
    };

    let input = null;
        switch(props.type){
            case "text":
                input = <input style={style} className="input" type="text" name="" placeholder={props.placeholder} value={props.value} onChange={props.change}/>;
                break;
            case "textarea":
                input = <textarea name={props.name} id="" cols="30" rows="10" placeholder={props.placeholder} value={props.value} onChange={props.change}></textarea>;
                break;
            case "email":
                input = <input className="input" style={style}  type="email" name="email" placeholder={props.placeholder} value={props.value} onChange={props.change}/>;
                break;
            case "password":
                input = <input className="input" type="password" name="password" placeholder={props.placeholder} value={props.value} onChange={props.change} />;
                break;
    }
    return(
        <div>
            <label >{props.label}</label><br/>
            {input}
        </div>
    );
};

export default input;