import React from "react";
import {observer} from 'mobx-react';
import VisualiserStore from './store/VisualiserStore';
import './style/styles.scss';

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
        const {
            onAssignmentWithoutBonus,
            onAssignmentWithBonus,
            onAssignmentWithBigBonus,
            hoursLogged, 
            hoursInCurrentMonth, 
            bonusLimitInHours,
            onAssignmentHundredPercentInHours
        } = VisualiserStore;
        const widthsPercent = {
            onAssignmentWithoutBonus: onAssignmentWithoutBonus / (hoursInCurrentMonth * 4.5) * 100,
            onAssignmentWithBonus: onAssignmentWithBonus / (hoursInCurrentMonth * 4.5) * 100,
            onAssignmentWithBigBonus: onAssignmentWithBigBonus / (hoursInCurrentMonth * 4.5) * 100,
            internalNoBonus: hoursLogged.internalNoBonus / (hoursInCurrentMonth * 4.5) * 100,
            internalTimeDecreasing: hoursLogged.internalTimeDecreasing / (hoursInCurrentMonth * 4.5) * 100,
            bonusLimit: bonusLimitInHours / (hoursInCurrentMonth * 4.5) * 100,
            bonusLimitBig: onAssignmentHundredPercentInHours * 0.2 / (hoursInCurrentMonth * 4.5) * 100,
            fulltime: hoursInCurrentMonth / (hoursInCurrentMonth * 4.5) * 100
        };


        const widths = {
            onAssignmentWithoutBonus: (onAssignmentWithoutBonus <= 0) ? "1px" : `${widthsPercent.onAssignmentWithoutBonus}%`,
            onAssignmentWithBonus: `${widthsPercent.onAssignmentWithBonus}%`,
            onAssignmentWithBigBonus: `${widthsPercent.onAssignmentWithBigBonus}%`,
            internalNoBonus: (hoursLogged.internalNoBonus <= 0) ? "1px" : `${widthsPercent.internalNoBonus}%`,
            internalTimeDecreasing: (hoursLogged.internalTimeDecreasing <= 0) ? "1px" : `${widthsPercent.internalTimeDecreasing}%`,
            bonusLimit: (bonusLimitInHours <= 0) ? "1px" : `${widthsPercent.bonusLimit}%`,
            bonusLimitBig: (onAssignmentHundredPercentInHours <= 0) ? "1px" : `${widthsPercent.bonusLimitBig}%`,
            fullTime: (hoursInCurrentMonth <= 0) ? "1px" : `${widthsPercent.fulltime}%`,
        }
        
        return (
            <div>
                <div className="graph-container">
                    <div className="bonus-row">
                    </div>
                    <div className="hours-row">
                        <div className="on-assignment" style={{width: widths.onAssignmentWithoutBonus}}></div>
                        <div className="on-assignment-bonus" style={{width: widths.onAssignmentWithBonus}}></div>
                        <div className="on-assignment-bonus-big" style={{width: widths.onAssignmentWithBigBonus}}></div>
                        <div className="internal-no-bonus" style={{width: widths.internalNoBonus}}></div>
                        <div className="internal-time-decreasing" style={{width: widths.internalTimeDecreasing}}></div>
                    </div>
                    <div className="axis-row">
                        <div className="bonus-limit" style={{width: widths.bonusLimit}}>80%</div>
                        <div className="bonus-limit-big" style={{width: widths.bonusLimitBig}}>100%</div>
                    </div>
                    <div className="full-time-row">
                        <div className="full-time" style={{width: widths.fullTime}}>heltid</div>
                    </div>
                </div>
                <div>
                    <ul>
                        <li>Debiterbar tid: {Math.round(VisualiserStore.hoursLoggedPercent.onAssignment * 100)} % ({VisualiserStore.hoursLogged.onAssignment})</li>
                        <li>Interna timmar: {Math.round(VisualiserStore.hoursLoggedPercent.internalNoBonus * 100)} % ({VisualiserStore.hoursLogged.internalNoBonus})</li>
                        <li>Tillgänlighetsminskande tid: {Math.round(VisualiserStore.hoursLoggedPercent.internalTimeDecreasing * 100)} % ({VisualiserStore.hoursLogged.internalTimeDecreasing})</li>
                        <li>Bonusgrundande procent: {Math.round(VisualiserStore.bonusLimit * 100)} %</li>
                        <li>Timmar i standardmånad: {Math.round(VisualiserStore.hoursInStandardMonth)}</li>
                        <li>Timmar i denna månad: {Math.round(VisualiserStore.hoursInCurrentMonth)}</li>
                        <li>Timmar innan bonus kickar in: {Math.round(VisualiserStore.bonusLimitInHours)}</li>
                        <li>Timmar utan bonus: {Math.round(VisualiserStore.onAssignmentWithoutBonus)}</li>
                        <li>Timmar med bonus: {Math.round(VisualiserStore.onAssignmentWithBonus)}</li>
                        <li>Timmar med stor bonus: {Math.round(VisualiserStore.onAssignmentWithBigBonus)}</li>
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
            </div>
        );
    }
}

export default App;
