import { observable, decorate } from "mobx";

class MainStore {
    @observable bonusLimit = 0.8;
    $observable hoursInStandardMonth = 180;
    bonusHours = 0;
    hours = {
        onAssignment: 0,
        internalNoBonus: 0,
        internalBonusShifting: 0
    };
}

decorate(MainStore, {
    bonusLimit: observable,
    hoursInStandardMonth: observable,
    bonusHours: observable,
    hours: observable
});

export default new MainStore();