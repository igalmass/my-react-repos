import './RequestBodyChooser.css'
import React, {Component} from 'react';
import TextDisplayer from "../TextDisplayer/TextDisplayer";


class RequestBodyChooser extends Component {
    state = {
        selectedRequestBodyId: 'addressWithoutCity'
    }

    allPossibleRequestBodys = {
        addressWithoutCity: {
            country: "USA",
            line1: "minesota 8"
        },
        goodAddress: {
            line1: "20 W 30th St",
            city: "New York",
            stateORprovince: "NY",
            postalCode: "10001"
        }
    }

    onRequestBodySelectionChange = (event) => {
        const newValue = event.target.value;
        this.setState({selectedRequestId: newValue});
        const newText = this.allPossibleRequestBodys[newValue];
        const asJson = JSON.stringify(newText, null, 4);
        this.props.onRequestTextChanged(asJson);
    };

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