import React, {Component} from 'react';
import './RequestSender.css';
import '../UI/Button/Button.css';
import axios from 'axios';
import JsonService from "../../services/JsonService";
const igiXmlFormatter = require('xml-formatter'); //  from 'xml-formatter';

class RequestSender extends Component {
    state = {
        selectedRequestId: "handleUserAddressChanged",
        theUrl: null,
    };

    baseUrl = "http://localhost:9008/ucaas-ap/v1/registry";
    // perstBaseUrl = "http://10.45.35.164:8184/ucaas-ap/v1/registry";
    perstBaseUrl = "http://localhost:8184/ucaas-ap/v1/registry";
    extensionDidsBaseUrl = `${this.perstBaseUrl}/ExtensionsDIDS`;
    // portalDspServiceBaseUrl="http://localhost:9008/ucaas-ap/v1/registry";




    getExtensionDidsForNumberUrl_ForGet(){
        return `${this.extensionDidsBaseUrl}/u-ifajxefub4d`; // for local
        // return `${this.extensionDidsBaseUrl}/u-8jxeodj3u`; // for 164

        // return "http://localhost:8184/ucaas-ap/v1/registry/ExtensionsDIDS/u-ifajxefub4d";
    }

    getExtensionDidsForNumberUrl_ForPatch() {
        return `${this.extensionDidsBaseUrl}/19995555555`
    }

    get_DidsByBusinessId() {
        return `${this.extensionDidsBaseUrl}?businessId=101`;
    }


    possibleRequests = {
        // "posts": 'https://jsonplaceholder.typicode.com/posts',
        "handleUserAddressChanged": `${this.baseUrl}/handleUserAddressChanged`,
        "handleBusinessAddressChanged": `${this.baseUrl}/handleBusinessAddressChanged`,
        "handleDspChanged": `${this.baseUrl}/handleDspChanged`,
        "get_didById": this.getExtensionDidsForNumberUrl_ForGet(),
        "patch_didById": this.getExtensionDidsForNumberUrl_ForGet(),
        "get_didsByBusinessId": this.get_DidsByBusinessId(),
        "helloTest": `${this.baseUrl}/hello`,
        "verifyAddress": `${this.baseUrl}/verifyAddress`,
        "dspExistsInCountry_trueResponse": `${this.baseUrl}/dspExistsInCountry?dspCode=BWDC&countryCode=US`,
        "dspExistsInCountry_falseResponse": `${this.baseUrl}/dspExistsInCountry?dspCode=BWDC2&countryCode=US`,
        "dspExistsInCountry_requestWithoutParams": `${this.baseUrl}/dspExistsInCountry?dspCode=BWDC2`,
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
            case "dspExistsInCountry_trueResponse":
            case "dspExistsInCountry_falseResponse":
            case "dspExistsInCountry_requestWithoutParams":
            case "get_extensionDidsForBusiness":
            case "get_didById":
                this.executeGetRequest();
                break;
            case "patch_didById":
                debugger;
                this.executePatchRequest();
                console.log('sending patch request ...');
                break;
            case "handleUserAddressChanged":
            case "handleBusinessAddressChanged":
            case "handleDspChanged":
                this.executePutRequest();
                break;

            default:
                debugger;
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
            this.getConfigWithHeaders())
            .then(
                response => {
                    this.handlePositiveResponse(response);
                }
            )
            .catch(
                error => {
                    this.extractResponseFromError(error);
                });
    }

    executePutRequest() {
        const url = this.possibleRequests[this.state.selectedRequestId];
        let requestBody = null;
        try {
            requestBody = JSON.parse(this.props.requestText);
        } catch (e) {
            alert(`The request test is invalid json: ${e}`);
            return;
        }
        axios.put(url,
            requestBody,
            this.getConfigWithHeaders())
            .then(
                response => {
                    this.handlePositiveResponse(response);
                }
            )
            .catch(
                error => {
                    this.extractResponseFromError(error);
                });
    }

    executePatchRequest() {
        const url = this.possibleRequests[this.state.selectedRequestId];
        let requestBody = null;
        try {
            requestBody = JSON.parse(this.props.requestText);
        } catch (e) {
            alert(`The request test is invalid json: ${e}`);
            return;
        }
        axios.patch(url,
            requestBody,
            this.getConfigWithHeaders())
            .then(
                response => {
                    this.handlePositiveResponse(response);
                }
            )
            .catch(
                error => {
                    this.extractResponseFromError(error);
                });
    }


    getConfigWithHeaders() {
        return {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "content-type": 'application/json'
            }
        };
    }

    handlePositiveResponse(response) {
        let responseText = "got response successfully";
        if (response && response.data) {
            responseText = JSON.stringify(response.data, null, 4);
        }

        console.log(`got response ${response}`);
        this.props.setResponse(responseText);
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
                        responseText = JSON.stringify(response.data, null, 4);
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

            // let additionalMsg = error.response.data.additionalMsg;
            // if (additionalMsg){
            //     if (additionalMsg.startsWith('<')){
            //         debugger;
            //         let asXml = igiXmlFormatter(additionalMsg);
            //         asXml = asXml.replace(/\n/g, "<br/>");
            //         error.response.data.additionalMsg = asXml;
            //         debugger;
            //
            //     }
            // }


            responseText =
                `Error: Got error ${error.response.status} from the server.\r\n` +
                `The data is:\r\n` +
                // `${JsonService.stringify(error.response.data)}`;
                `${JSON.stringify(error.response.data, null, 4)}`;
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
            </div>
        );
    }

}

export default RequestSender;