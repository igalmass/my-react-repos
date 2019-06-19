import React, {Component} from 'react';
import TextDisplayer from '../../components/TextDisplayer/TextDisplayer';
import RequestSender from "../../components/RequestSender/RequestSender";
import './DspTester.css';

class DspTester extends Component {

    state = {
        requestText: JSON.stringify({sampleKey1: 'val1', sampleKey2: 'val2'}, null, 4),
        responseText: 'default response text',
    };

    setResponse = (newResponse) => {
        this.setState({responseText: newResponse});
    };

    onRequestTextChanged = (newText) => {
        this.setState({requestText: newText});
    };

    render() {
        return (
            <div className="DspTester">
                <RequestSender setResponse={this.setResponse} />
                <TextDisplayer title="The Request:" onTextChanged={this.onRequestTextChanged}>{this.state.requestText}</TextDisplayer>
                <TextDisplayer title="The Response:">{this.state.responseText}</TextDisplayer>
            </div>);
    }
}

export default DspTester;