import React from 'react';


const textDisplayer = (props) => {

    const onTextChanged = (newValue) => {
        debugger;
        console.log(`${newValue}`);
    }

    return (<div>
            <h3>{props.title}</h3>
            <div style={{border: '1px solid red', minHeight: '100px', marginTop: '30px'}}>
                {props.children}
            </div>
            <textarea rows='10' cols='200' defaultValue={props.children} onChange={props.onTextChanged}/>
        </div>
    )
}

export default textDisplayer;