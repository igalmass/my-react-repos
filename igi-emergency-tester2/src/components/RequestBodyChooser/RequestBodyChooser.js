import './RequestBodyChooser.css'
import React, {Component} from 'react';


class RequestBodyChooser extends Component {
    state = {
        selectedRequestBodyId: 'goodAddress_200_success'
    };

    allPossibleRequestBodys = {
        post_registrationRequest: {
            callerName: "my called name"
        },
        put_Cwl_test: {
            "didForking": "ForkAllDIDs",
            "ringInterval": "10"
        },
        handleDspChanged: {
            isValidDsp: false,
            businessId: "101"
        },
        goodAddress_200_success: {
            line1: "20 W 30th St",
            city: "New York",
            stateORprovince: "NY",
            postalCode: "10001"
        },
        returns_minorModifications: {
            line1: "20 W 30th St",
            city: "new york",
            stateORprovince: "NY",
            postalCode: "10001"
        },
        returns_suggestedAddress_ADDR_CONFLICT: {
            line1: "20 W 30th St",
            city: "New ork",
            stateORprovince: "NY",
            postalCode: "10001"
        },
        addressWith_409_InvalidWabashi_ADDR_CONFLICT: {
            line1: "401 N WABASHI AV",
            city: 'CHiCAGO',
            stateORprovince: 'IL',
            postalCode: "60611"
        },
        addressWith_400_InvalidStateCode_ADDR_ILGL: {
            line1: "20 W 30th ST",
            city: "New York",
            stateORprovince: "NEW YORK",
            postalCode: "10001"
        },
        addressWithoutCity_ADDR_ILGL: {
            country: "USA",
            line1: "minesota 8"
        },
        handleUserAddressChanged: {
            didNumbers: [
                "1", "2", "3"
            ],
            isValidDsp: true
        },
        handleBusinessAddressChanged: {
            isValidDsp: false,
            businessId: "101"
        }

    };

    componentDidMount() {
        this.doRequestTextUpdate(this.state.selectedRequestBodyId);
    }

    onRequestBodySelectionChange = (event) => {
        const newValue = event.target.value;

        this.doRequestTextUpdate(newValue);
    };

    doRequestTextUpdate = (newValue) => {
        this.setState({selectedRequestId: newValue});
        const newText = this.allPossibleRequestBodys[newValue];
        const asJson = JSON.stringify(newText, null, 4);
        this.props.onRequestTextChanged(asJson);
    }

    getDropdownList() {
        const options = Object.keys(this.allPossibleRequestBodys).map(
            curKey => <option
                value={curKey}
                key={curKey}
                defaultValue={curKey === this.state.selectedRequestId}>{curKey}
            </option>);
        const dropDown = (<select onChange={this.onRequestBodySelectionChange}>
            {options}
        </select>);

        return dropDown;
    }

    render() {
        return <div className="RequestBodyChooser">
            <p>Predefined requests:</p>
            <div>{this.getDropdownList()}</div>
        </div>
    }
}

export default RequestBodyChooser;