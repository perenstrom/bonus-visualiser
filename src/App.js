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
            onAssignmentWithBigBonusAndPay,
            hoursLogged, 
            hoursLoggedPercent,
            hoursInCurrentMonth, 
            bonusLimitInHours,
            onAssignmentHundredPercentInHours,
            internalHoursWithPay,
            internalHoursWithoutPay,
            bonusLimit,
            hoursInStandardMonth,
            internalTimeDecreasingWithPay,
            internalTimeDecreasingWithoutPay
        } = VisualiserStore;

        const scaleFactor = 4.5;

        const widthsPercent = {
            onAssignmentWithoutBonus: onAssignmentWithoutBonus / (hoursInCurrentMonth * scaleFactor) * 100,
            onAssignmentWithBonus: onAssignmentWithBonus / (hoursInCurrentMonth * scaleFactor) * 100,
            onAssignmentWithBigBonusAndPay: onAssignmentWithBigBonusAndPay / (hoursInCurrentMonth * scaleFactor) * 100,
            onAssignmentWithBigBonus: onAssignmentWithBigBonus / (hoursInCurrentMonth * scaleFactor) * 100,
            internalNoBonus: hoursLogged.internalNoBonus / (hoursInCurrentMonth * scaleFactor) * 100,
            internalHoursWithPay: internalHoursWithPay / (hoursInCurrentMonth * scaleFactor) * 100,
            internalHoursWithoutPay: internalHoursWithoutPay / (hoursInCurrentMonth * scaleFactor) * 100,
            internalTimeDecreasingWithPay: internalTimeDecreasingWithPay / (hoursInCurrentMonth * scaleFactor) * 100,
            internalTimeDecreasingWithoutPay: internalTimeDecreasingWithoutPay / (hoursInCurrentMonth * scaleFactor) * 100,
            bonusLimit: bonusLimitInHours / (hoursInCurrentMonth * scaleFactor) * 100,
            bonusLimitBig: onAssignmentHundredPercentInHours * 0.2 / (hoursInCurrentMonth * scaleFactor) * 100,
            fulltime: hoursInCurrentMonth / (hoursInCurrentMonth * scaleFactor) * 100
        };

        const widths = {
            onAssignmentWithoutBonus: (onAssignmentWithoutBonus <= 0) ? "1px" : `${widthsPercent.onAssignmentWithoutBonus}%`,
            onAssignmentWithBonus: `${widthsPercent.onAssignmentWithBonus}%`,
            onAssignmentWithBigBonusAndPay: `${widthsPercent.onAssignmentWithBigBonusAndPay}%`,
            onAssignmentWithBigBonus: `${widthsPercent.onAssignmentWithBigBonus}%`,
            internalNoBonus: (hoursLogged.internalNoBonus <= 0) ? "1px" : `${widthsPercent.internalNoBonus}%`,
            internalHoursWithPay: (internalHoursWithPay <= 0) ? "1px" : `${widthsPercent.internalHoursWithPay}%`,
            internalHoursWithoutPay: (internalHoursWithoutPay <= 0) ? "1px" : `${widthsPercent.internalHoursWithoutPay}%`,
            internalTimeDecreasingWithPay: (internalTimeDecreasingWithPay <= 0) ? "1px" : `${widthsPercent.internalTimeDecreasingWithPay}%`,
            internalTimeDecreasingWithoutPay: (internalTimeDecreasingWithoutPay <= 0) ? "1px" : `${widthsPercent.internalTimeDecreasingWithoutPay}%`,
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
                        <div className="on-assignment-bonus" style={{width: widths.onAssignmentWithBonus}}>
                            <div className="base"></div>
                            <div className="bonus"></div>
                        </div>
                        <div className="on-assignment-bonus-big-with-pay" style={{width: widths.onAssignmentWithBigBonusAndPay}}>
                            <div className="base"></div>
                            <div className="bonus"></div>
                        </div>
                        <div className="on-assignment-bonus-big" style={{width: widths.onAssignmentWithBigBonus}}>
                            <div className="base"></div>
                            <div className="bonus"></div>
                        </div>
                        <div className="internal-with-pay" style={{width: widths.internalHoursWithPay}}></div>
                        <div className="internal-without-pay" style={{width: widths.internalHoursWithoutPay}}></div>
                        <div className="internal-time-decreasing-with-pay" style={{width: widths.internalTimeDecreasingWithPay}}></div>
                        <div className="internal-time-decreasing-without-pay" style={{width: widths.internalTimeDecreasingWithoutPay}}></div>
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
                        <li>Debiterbar tid: {Math.round(hoursLoggedPercent.onAssignment * 100)} % ({hoursLogged.onAssignment})</li>
                        <li>Interna timmar: {Math.round(hoursLoggedPercent.internalNoBonus * 100)} % ({hoursLogged.internalNoBonus})</li>
                        <li>Tillgänlighetsminskande tid: {Math.round(hoursLoggedPercent.internalTimeDecreasing * 100)} % ({hoursLogged.internalTimeDecreasing})</li>
                        <li>Bonusgrundande procent: {Math.round(bonusLimit * 100)} %</li>
                        <li>Timmar i standardmånad: {Math.round(hoursInStandardMonth)}</li>
                        <li>Timmar i denna månad: {Math.round(hoursInCurrentMonth)}</li>
                        <li>Timmar innan bonus kickar in: {Math.round(bonusLimitInHours)}</li>
                        <li>Timmar utan bonus: {Math.round(onAssignmentWithoutBonus)}</li>
                        <li>Timmar med bonus: {Math.round(onAssignmentWithBonus)}</li>
                        <li>Timmar med stor bonus och lön: {Math.round(onAssignmentWithBigBonusAndPay)}</li>
                        <li>Timmar med stor bonus: {Math.round(onAssignmentWithBigBonus)}</li>
                        <li>Interna timmar med lön: {Math.round(internalHoursWithPay)}</li>
                        <li>Interna timmar utan lön: {Math.round(internalHoursWithoutPay)}</li>
                        <li>TM-timmar med lön: {Math.round(internalTimeDecreasingWithPay)}</li>
                        <li>TMtimmar utan lön: {Math.round(internalTimeDecreasingWithoutPay)}</li>
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
