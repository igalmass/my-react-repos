import React, {Component} from 'react';
import TextDisplayer from '../../components/TextDisplayer/TextDisplayer';
import RequestSender from "../../components/RequestSender/RequestSender";
import RequestBodyChooser from '../../components/RequestBodyChooser/RequestBodyChooser';
import './DspTester.css';

class DspTester extends Component {

    getDummyAddress = () => {
        return {
            country: 'USA',
            line1: 'minesota 8'
        }
    };

    defaultResponse = {
        note: "this is sample response hahaha",
        code: "code code",
        msg: "the msg",
        data: {
            "suggestedAddress": {},
            "apAddress": {}
        }
    };

    state = {
        requestText: JSON.stringify(
            this.getDummyAddress(), null, 4),
        responseText: JSON.stringify(this.defaultResponse, null, 4)
    };

    setResponse = (newResponse) => {
        this.setState({responseText: newResponse});
    };

    onRequestTextChanged = (newText) => {
        this.setState({requestText: newText});
    };

    onResponseTextChanged = (newText) => {
        this.setState({responseText: newText});
    }

    render() {
        return (
            <div className="DspTester">
                <RequestSender setResponse={this.setResponse} requestText={this.state.requestText}/>
                {/*<RequestBodyChooser onRequestTextChanged={this.onRequestTextChanged()}/>*/}
                <TextDisplayer title="The Request:" onTextChanged={this.onRequestTextChanged}>{this.state.requestText}</TextDisplayer>
                <TextDisplayer title="The Response:" onTextChanged={this.onResponseTextChanged}>{this.state.responseText}</TextDisplayer>
            </div>);
    }
}

export default DspTester;