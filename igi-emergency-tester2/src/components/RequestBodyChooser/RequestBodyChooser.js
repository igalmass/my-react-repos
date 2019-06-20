import './RequestBodyChooser.css'
import React, {Component} from 'react';


class RequestBodyChooser extends Component {
    state = {
        selectedRequestId: 'addressWithoutCity'
    }

    allPossibleRequests = {
        addressWithoutCity: {
            country: "USA",
            line1: "minesota 8"
        },
        goodAddress: {
            country: "USA",
            zip: "10001",
            city: "New York"
        }
    }




    getDropdownList() {
        const options = Object.keys(this.allPossibleRequests).map(
            curKey => <option
                value={curKey}
                key={curKey}
                defaultValue={curKey == this.state.selectedRequestId}>{curKey}
            </option>);
        const dropDown = (<select onChange={this.onRequestSelectionChange}>
            {options}
        </select>);

        return dropDown;
    }

    render() {
        return <div className="RequestBodyChooser">{this.getDropdownList()}</div>
    }


//         const options = Object.keys(this.possibleRequests).map(
    // curKey =>
    //     <option
    //         value={curKey}
    //         key={curKey}
    //         defaultValue={curKey == this.state.selectedRequestId}>{curKey}
    //     </option>);


    //     return <div className="RequestBodyChooser">
    //             Request body chooser
    //           </div>
    // }
}

export default RequestBodyChooser;