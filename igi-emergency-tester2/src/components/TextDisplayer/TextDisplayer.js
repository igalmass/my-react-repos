import React from 'react';
import './TextDisplayer.css';
import '../UI/Button/Button.css';

const textDisplayer = (props) => {

    const isJsonText = (stringToTest) => {
        try{
            const test = JSON.parse(stringToTest);
            return true;
        } catch (e) {
            return false;
        }
    };

    const onBeautifyButtonClicked = () => {
        if (isJsonText(props.children)){
            const jsonObj = JSON.parse(props.children);
            const formatted = JSON.stringify(jsonObj, null, 4);
            props.onTextChanged(formatted);
        } else {
            alert('invalid JSON !');
        }
    };

    const onTextChanged = (event) => {
        const newText = event.target.value;
        debugger;
        props.onTextChanged(newText);
    }

    const onClearTextButtonClicked = () => {
        props.onTextChanged("");
    };

    function getTextareaToRender() {
        let style = {};
        if (props.height){
            style = {height: props.height};
        }
        return <textarea rows='10' cols='200' value={props.children} style={style} onChange={onTextChanged}/>;
    }

    return (<div className="TextDisplayer">
            <div style={{display: 'flex'}}>
                <h3>{props.title}</h3>
                <button className="myButton" onClick={onBeautifyButtonClicked}>Beautify</button>
                <button className="myButton" onClick={onClearTextButtonClicked}>Clear</button>
            </div>
            {getTextareaToRender()}
        </div>
    )
}

export default textDisplayer;