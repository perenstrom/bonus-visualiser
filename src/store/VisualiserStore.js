import { observable, action, computed } from "mobx";

class MainStore {
    @observable bonusLimit = 0.8;
    @observable hoursInStandardMonth = 180;
    @observable hoursInCurrentMonth = 190;
    @observable
    hoursLoggedPercent = {
        onAssignment: 0,
        internalNoBonus: 0,
        internalTimeDecreasing: 0
    };

    @action.bound
    changeHours(property, value) {
        this.hoursLoggedPercent[property] = value / 100;
    }

    @computed
    get hoursLogged() {
        return {
            onAssignment: Math.round(
                this.hoursLoggedPercent.onAssignment * this.hoursInCurrentMonth
            ),
            internalNoBonus: Math.round(
                this.hoursLoggedPercent.internalNoBonus *
                    this.hoursInCurrentMonth
            ),
            internalTimeDecreasing: Math.round(
                this.hoursLoggedPercent.internalTimeDecreasing *
                    this.hoursInCurrentMonth
            )
        };
    }

    @computed
    get onAssignmentHundredPercentInHours() {
        return (
            this.hoursInCurrentMonth *
            (1 - this.hoursLoggedPercent.internalTimeDecreasing)
        );
    }

    @computed
    get bonusLimitInHours() {
        // prettier-ignore
        return Math.max(0, this.onAssignmentHundredPercentInHours * this.bonusLimit);
    }

    @computed
    get onAssignmentWithoutBonus() {
        return Math.min(this.hoursLogged.onAssignment, this.bonusLimitInHours);
    }

    @computed
    get onAssignmentWithBonus() {
        return Math.max(
            0,
            this.hoursLogged.onAssignment -
                this.onAssignmentWithoutBonus -
                this.onAssignmentWithBigBonus - 
                this.onAssignmentWithBigBonusAndPay
        );
    }

    @computed
    get onAssignmentWithBigBonusAndPay() {
        return Math.min(
            this.hoursLogged.onAssignment,
            Math.max(
                0,
                this.hoursLogged.onAssignment -
                    this.onAssignmentHundredPercentInHours -
                    this.onAssignmentWithBigBonus
            )
        );
    }

    @computed
    get onAssignmentWithBigBonus() {
        return Math.min(
            this.hoursLogged.onAssignment,
            Math.max(
                0,
                this.hoursLogged.onAssignment -
                    this.hoursInCurrentMonth
            )
        );
    }

    @computed
    get internalHoursWithPay() {
        return Math.min(
            this.hoursLogged.internalNoBonus,
            Math.max(
                0,
                this.hoursInCurrentMonth - this.hoursLogged.onAssignment
            )
        );
    }

    @computed
    get internalHoursWithoutPay() {
        return this.hoursLogged.internalNoBonus - this.internalHoursWithPay;
    }

    @computed
    get internalTimeDecreasingWithPay() {
        return Math.min(
            this.hoursLogged.internalTimeDecreasing,
            Math.max(
                0,
                this.hoursInCurrentMonth - this.hoursLogged.onAssignment - this.hoursLogged.internalNoBonus
            )
        );
    }

    @computed
    get internalTimeDecreasingWithoutPay() {
        return this.hoursLogged.internalTimeDecreasing - this.internalTimeDecreasingWithPay;
    }

    @computed
    get totalHours() {
        return (
            this.hoursLogged.onAssignment +
            this.hoursLogged.internalNoBonus +
            this.hoursLogged.internalTimeDecreasing
        );
    }
}

export default new MainStore();
