import React from "react";
import {observer} from 'mobx-react';
import VisualiserStore from './store/VisualiserStore';

@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        VisualiserStore.changeHours(event.target.name, event.target.value);
    }

    render() {
        return (
            <div>
                <ul>
                    <li>Debiterbar tid: {Math.round(VisualiserStore.hoursLoggedPercent.onAssignment * 100)} % ({VisualiserStore.hoursLogged.onAssignment})</li>
                    <li>Interna timmar: {Math.round(VisualiserStore.hoursLoggedPercent.internalNoBonus * 100)} % ({VisualiserStore.hoursLogged.internalNoBonus})</li>
                    <li>Tillgänlighetsminskande tid: {Math.round(VisualiserStore.hoursLoggedPercent.internalTimeDecreasing * 100)} % ({VisualiserStore.hoursLogged.internalTimeDecreasing})</li>
                    <li>Bonusgrundande procent: {Math.round(VisualiserStore.bonusLimit * 100)} %</li>
                    <li>Timmar i standardmånad: {VisualiserStore.hoursInStandardMonth}</li>
                    <li>Timmar i denna månad: {VisualiserStore.hoursInCurrentMonth}</li>
                    <li>Timmar innan bonus kickar in: {VisualiserStore.bonusLimitInHours}</li>
                    <li>Timmar utan bonus: {VisualiserStore.onAssignmentWithoutBonus}</li>
                    <li>Timmar med bonus: {VisualiserStore.onAssignmentWithBonus}</li>
                    <li>Timmar med stor bonus: {VisualiserStore.onAssignmentWithBigBonus}</li>
                </ul>
                <div>
                    <form>
                        <input
                            name="onAssignment"
                            type="range"
                            min="0"
                            max="150"
                            value={VisualiserStore.hoursLoggedPercent.onAssignment * 100}
                            onChange={this.handleChange}
                        />
                        <input
                            name="internalNoBonus"
                            type="range"
                            min="0"
                            max="150"
                            value={VisualiserStore.hoursLoggedPercent.internalNoBonus * 100}
                            onChange={this.handleChange}
                        />
                        <input
                            name="internalTimeDecreasing"
                            type="range"
                            min="0"
                            max="150"
                            value={VisualiserStore.hoursLoggedPercent.internalTimeDecreasing * 100}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
