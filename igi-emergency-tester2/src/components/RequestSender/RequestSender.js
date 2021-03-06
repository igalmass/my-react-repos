import React, {Component} from 'react';
import './RequestSender.css';
import '../UI/Button/Button.css';
import axios from 'axios';

class RequestSender extends Component {
    portalDspBaseUrl = "http://localhost:9008/ucaas-ap/v1/registry";
    portalCpeBaseUrl = "http://localhost:9011/ucaas-ap/v1/registry";
    perstBaseUrl = "http://localhost:8184/ucaas-ap/v1/registry";
    flowEngineBaseUrl = "http://localhost:8182/ucaas-ap/v1/registry";
    portalApiGwBaseUrl = "http://localhost:8181/ucaas-ap/v1/registry";
    portalBwdcClientBaseUrl = "http://localhost:8082";
    extensionDidsBaseUrl = `${this.perstBaseUrl}/ExtensionsDIDS/registry`;

    possibleRequests = {
        "get_hss": `${this.portalApiGwBaseUrl}/hss/1234`,
        "post_flowEngine_register": `${this.flowEngineBaseUrl}/DIDS/addressRegistrationRequest`,
        "post_portalBwdcClient_registrationRequest": `${this.portalBwdcClientBaseUrl}/bwdc/v1/accounts/register`,
        "handleBusinessAddressChanged": `${this.portalDspBaseUrl}/didsStatus/handleBusinessAddressChanged`,
        "get_cwlTest": "http://localhost:8088/ucaas-ap/v1/registry/CWLProfiles/1234",
        "put_cwlTest": "http://localhost:8181/ucaas-ap/v1/registry/businesses/101/services/cwl", // https://<ip:port>/ucaas-ap/v1/registry/businesses/<businessID>/services/cwl
        "get_portalWsgPersistence_hss": "http://localhost:8184/ucaas-ap/v1/registry/hss/101",
        "handleDspChanged": `${this.portalDspBaseUrl}/didsStatus/handleDspChanged`,
        "get_didsByBusinessId": this.get_DidsByBusinessId(),
        "patch_didById": this.getExtensionDidsForNumberUrl_ForGet(),
        "get_ConsulTest_163": "https://10.45.35.163:8500/v1/kv/?keys&dc=dc1&separator=%2F",
        "get_ConsulTest_164": "https://10.45.35.164:8500/v1/kv/?keys&dc=dc1&separator=%2F",
        "get_ConsulTest_Evgeny": "https://10.1.114.150:8500/v1/kv/?keys&dc=dc1&separator=%2F",
        "handleUserAddressChanged": `${this.portalDspBaseUrl}/didsStatus/handleUserAddressChanged`,
        "get_didById": this.getExtensionDidsForNumberUrl_ForGet(),
        "helloTest": `${this.portalDspBaseUrl}/hello`,
        "verifyAddress": `${this.portalDspBaseUrl}/verifyAddress`,
        "dspExistsInCountry_trueResponse": `${this.portalDspBaseUrl}/dspExistsInCountry?dspCode=BWDC&countryCode=US`,
        "dspExistsInCountry_falseResponse": `${this.portalDspBaseUrl}/dspExistsInCountry?dspCode=NO_DSP&countryCode=US`,
        "dspExistsInCountry_requestWithoutParams": `${this.portalDspBaseUrl}/dspExistsInCountry?dspCode=BWDC2`,
        "registerAddress": 'http://localhost/registerAddress',
        "isVendorModelSca_trueResponse": `${this.portalCpeBaseUrl}/vendorModels/isVendorModelSca?vendor=Polycom&model=VVX350`,
        "isVendorModelSca_falseResponse": `${this.portalCpeBaseUrl}/vendorModels/isVendorModelSca?vendor=abc&model=456`,
    };

    state = {
        selectedRequestId: "get_portalWsgPersistence_hss",
        theUrl: null,
        possibleRequests: this.possibleRequests
    };


    getExtensionDidsForNumberUrl_ForGet() {
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


    getDropDown = () => {
        const options = Object.keys(this.state.possibleRequests).map(
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
        const selectedRequestId = this.state.selectedRequestId;

        if (selectedRequestId.startsWith("get_")) {
            this.executeGetRequest();
            return;
        } else if (selectedRequestId.startsWith("put_")) {
            this.executePostRequest();
            return;
        } else if (selectedRequestId.startsWith("patch_")) {
            this.executePatchRequest();
            return;
        } else if (selectedRequestId.startsWith("post_")) {
            this.executePostRequest();
            return;
        }

        switch (selectedRequestId) {
            case "helloTest":
            case "dspExistsInCountry_trueResponse":
            case "dspExistsInCountry_falseResponse":
            case "dspExistsInCountry_requestWithoutParams":
            case "get_extensionDidsForBusiness":
            case "get_didById":
            case "get_didsByBusinessId":
            case "isVendorModelSca_trueResponse":
            case "isVendorModelSca_falseResponse":
            case "get_ConsulTest_163":
            case "get_ConsulTest_164":
            case "get_ConsulTest_Evgeny":
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
                alert(`Unknown http method for ${selectedRequestId}`);
                break;
        }

    };

    executePostRequest() {
        const url = this.state.possibleRequests[this.state.selectedRequestId];
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
        const url = this.state.possibleRequests[this.state.selectedRequestId];
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
        const url = this.state.possibleRequests[this.state.selectedRequestId];
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
        if (response.status) {
            responseText = responseText + `- got status ${response.status}\r\n\r\n\r\n`;
        }
        if (response && response.data) {
            responseText = responseText + JSON.stringify(response.data, null, 4);
        }

        console.log(`got response ${response}`);
        this.props.setResponse(responseText);
    }

    // getHeaders() {
    //     let result = {
    //         'Access-Control-Allow-Origin': '*',
    //         "content-type": 'application/json'
    //     };
    // }

    executeGetRequest() {
        const url = this.state.possibleRequests[this.state.selectedRequestId];
        axios.get(url,
            {
                headers: this.getHeaders()
            })
            .then(
                response => this.handlePositiveResponse(response)
            )
            .catch(
                error => {
                    debugger;
                    this.extractResponseFromError(error);
                });
    }

    // 'ap-correlationid': 'MavenirAdmin/faac6b33-9c26-f595-3068-0fe818abd696_abc',
    // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiY29tcGFkbWluIiwicm9sZSI6IkVudGl0eUFkbWluIiwiaWF0IjoxNTc0MzI4Mzk5LCJleHAiOjE1NzQ5MzMxOTl9.BNmh3OsFqOABHXFwLJ7Fa-0AGlTCAth8Jydc-aLU8jU9I34mjeQOt5wlh8bScgBtWhWANgUYDQAZfmTR6hz0XGC2r9DYByq09cwV8GkXy9M6R3kCKJFTol3zi9BWXMYlqTG5Xe4IrcgjFQcYTfzZuhFKpOvXhAVwOJUlJVUcVbzrasBkr2FiqEpkzXFmKNcO-_2tajdYz3O_-jATZ5x7KSr64PnSvIxO98bKinfDs1-wo4wtya3hbPiVXXfcIe_JW1FgVTdIpn1gOO4yDQwMKPOHuZE_BpvEgxgKYVBdKKXiPhAVCduImcAf7Efjkl2Zhcj_N9z0taQeogLuZFlpyw',
    getHeaders() {
        return {
            'Access-Control-Allow-Origin': '*',
            "content-type": 'application/json',



        };
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
                `${JSON.stringify(error.response.data, null, 4)}`;
        }
        this.props.setResponse(responseText);
    }

    handleUrlChanged = ($event) => {
        const newState = this.state;
        newState.possibleRequests = {...this.state.possibleRequests};
        newState.possibleRequests[this.state.selectedRequestId] = $event.target.value;
        this.setState(newState);
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
                        <input
                            type="text"
                            value={this.state.possibleRequests[this.state.selectedRequestId]}
                            onChange={this.handleUrlChanged}
                        />
                    </div>
                    <button className="myButton" type="button" onClick={this.onSendButtonClicked}>Send request</button>
                </div>
            </div>
        );
    }


}

export default RequestSender;