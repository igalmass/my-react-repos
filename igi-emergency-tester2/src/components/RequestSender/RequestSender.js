import React, {Component} from 'react';
import './RequestSender.css';
import '../UI/Button/Button.css';
import axios from 'axios';


class RequestSender extends Component {
    state = {
        selectedRequestId: "verifyAddress",
        theUrl: null,
    };

    possibleRequests = {
        "posts": 'https://jsonplaceholder.typicode.com/posts',
        "helloTest": 'http://localhost:9008/ucaas-ap/v1/hello',
        "verifyAddress": 'http://localhost:9008/ucaas-ap/v1/verifyAddress',
        "registerAddress": 'http://localhost/registerAddress'
    };

    getDropDown = () => {
        const options = Object.keys(this.possibleRequests).map(
            curKey =>
                <option
                    value={curKey}
                    key={curKey}
                    defaultValue={curKey == this.state.selectedRequestId}>{curKey}
            </option>);

        const dropDown = (<select onChange={this.onRequestSelectionChange}>
            {options}
        </select>);

        return dropDown;
    };

    onRequestSelectionChange = (event) => {
        this.setState({selectedRequestId: event.target.value});
    };

    onSendButtonClicked = () => {
        switch (this.state.selectedRequestId) {
            case "helloTest":
                this.executeGetRequest();
                break;
            default:
                this.executePostRequest();
                break;
        }

    };

    executePostRequest() {
        const url = this.possibleRequests[this.state.selectedRequestId];
        let requestBody = null;
        try {
            requestBody = JSON.parse(this.props.requestText);
        } catch (e) {
            alert(`The request test is invalid json: ${e}`);
            return;
        }
        axios.post(url,
            requestBody,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "content-type": 'application/json'
                }
            })
            .then(
                response => {
                    let responseText = "got response successfully";
                    if (response && response.data) {
                        responseText = JSON.stringify(response.data);
                    }

                    console.log(`got response ${response}`);
                    this.props.setResponse(responseText);
                }
            )
            .catch(
                error => {
                    // debugger;
                    // this.props.setResponse(error.message ? error.message : "Got error !");
                    this.extractResponseFromError(error);
                });
    }



    executeGetRequest() {
        const url = this.possibleRequests[this.state.selectedRequestId];
        axios.get(url,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "content-type": 'application/json'
                }
            })
            .then(
                response => {
                    let responseText = "got response successfully";
                    if (response && response.data) {
                        responseText = JSON.stringify(response.data);
                    }

                    console.log(`got response ${response}`);
                    this.props.setResponse(responseText);
                }
            )
            .catch(
                error => {
                    this.extractResponseFromError(error);
                });
    }


    extractResponseFromError(error) {
        let responseText = error.message ? error.message : "Got error !";
        if (error.response && error.response.data) {
            debugger;
            responseText =
                `Error: Got error ${error.response.status} from the server. Data is:\r\n` +
                `${JSON.stringify(error.response.data, null, 4)}`;
            // responseText = responseText + JSON.stringify(error.response.data);
        }
        this.props.setResponse(responseText);
    }

    render() {
        return (
            <div className="RequestSender">
                <div style={{display: 'flex'}}>
                    <p style={{marginLeft: '20px'}}>The Request: </p>
                    {this.getDropDown()}
                </div>
                <div className="UrlSendingWrapper">
                    <div className="TheUrl">
                        <strong>URL: </strong>
                        <input type="text"
                                value={this.possibleRequests[this.state.selectedRequestId]} readOnly
                                />
                    </div>
                    <button className="myButton" type="button" onClick={this.onSendButtonClicked}>Send request</button>
                </div>
                {/*<div>*/}
                {/*    <p>for display only: The URL: {this.state.theUrl}</p>*/}
                {/*</div>*/}
            </div>
        );
    }


}

export default RequestSender;