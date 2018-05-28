import React from "react";
import {observer} from 'mobx-react';

@observer
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bonusLimit: 0.8,
            hoursInStandardMonth: 180,
            bonusHours: 0,
            hours: {
                onAssignment: 0,
                internalNoBonus: 0,
                internalBonusShifting: 0
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.changeHours = this.changeHours.bind(this);
    }

    handleChange(event) {
        event.preventDefault();

        this.changeHours(event.target.name, event.target.value);
    }

    changeHours(property, value) {
        let newHours = { ...this.state.hours };
        newHours[property] = value;

        this.setState({ hours: newHours });
    }

    render() {
        const {
            onAssignment,
            internalNoBonus,
            internalBonusShifting
        } = this.state.hours;

        return (
            <div>
                <ul>
                    <li>Debiterbar tid: {onAssignment}</li>
                    <li>Interna timmar: {internalNoBonus}</li>
                    <li>Tillgänlighetsminskande tid: {internalBonusShifting}</li>
                </ul>
                <div>
                    <form>
                        <input
                            name="onAssignment"
                            type="range"
                            min="0"
                            max="150"
                            value={onAssignment}
                            onChange={this.handleChange}
                        />
                        <input
                            name="internalNoBonus"
                            type="range"
                            min="0"
                            max="150"
                            value={internalNoBonus}
                            onChange={this.handleChange}
                        />
                        <input
                            name="internalBonusShifting"
                            type="range"
                            min="0"
                            max="150"
                            value={internalBonusShifting}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
