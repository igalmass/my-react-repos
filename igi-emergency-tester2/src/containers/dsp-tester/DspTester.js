import React, {Component} from 'react';
import TextDisplayer from '../../components/TextDisplayer';
import RequestSender from "../../components/RequestSender/RequestSender";
import './DspTester.css';

class DspTester extends Component {

    state = {
        // theUrl: "The URL comes here",
        requestText: 'default request text',
        responseText: 'default response text'
    }

    setResponse = (newResponse) => {
        debugger;
        this.setState({responseText: newResponse});
    }

    // setTheUrl = (newUrl) => {
    //     this.setState({theUrl: newUrl});
    // };

    render() {
        return (
            <div className="DspTester">
                <RequestSender setResponse={this.setResponse} />
                <TextDisplayer title="The Request:">{this.state.requestText}</TextDisplayer>
                <TextDisplayer title="The Response:">{this.state.responseText}</TextDisplayer>
            </div>);
    }
}

export default DspTester;