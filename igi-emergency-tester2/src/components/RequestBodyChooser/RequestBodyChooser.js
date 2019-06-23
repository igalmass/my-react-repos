import './RequestBodyChooser.css'
import React, {Component} from 'react';


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
            country: "USA",
            zip: "10001",
            city: "New York"
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.selectedRequestBodyId !== nextState.selectedRequestBodyId){
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        //  todo: add here
    }


    onRequestBodySelectionChange = (event) => {
        this.setState({selectedRequestId: event.target.value});
        const newText = this.allPossibleRequestBodys[this.state.selectedRequestBodyId];
        this.props.onRequestTextChanged(newText);
    };



    getDropdownList() {
        const options = Object.keys(this.allPossibleRequestBodys).map(
            curKey => <option
                value={curKey}
                key={curKey}
                defaultValue={curKey == this.state.selectedRequestId}>{curKey}
            </option>);
        const dropDown = (<select onChange={this.onRequestBodySelectionChange}>
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