import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

export default class Actions {
    static createPlant(name) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_CREATE,
            name: name
        });
    }
    
    static destroyPlant(name) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_DESTROY,
            name: name
        });
    }
    
    static updatePlantDifficulty(name, difficulty) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_DIFFICULTY,
            name: name,
            difficulty: difficulty
        });
    }
    
    static updatePlantGrowTime(name, growTime) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_GROWTIME,
            name: name,
            growTime: growTime
        });
    }
    
    static updatePlantLabel(name, label) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_LABEL,
            name: name,
            label: label
        });
    }
    
    static updatePlantNotes(name, notes) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_NOTES,
            name: name,
            notes: notes
        });
    }
    
    static updatePlantPricePerUnit(name, pricePerUnit) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_PRICE_PER_UNIT,
            name: name,
            pricePerUnit: pricePerUnit
        });
    }
    
    static updatePlantRarity(name, rarity) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_RARITY,
            name: name,
            rarity: rarity
        });
    }
    
    static updatePlantTaste(name, taste) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_TASTE,
            name: name,
            taste: taste
        });
    }
    
    static updatePlantUnit(name, unit) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_UNIT,
            name: name,
            unit: unit
        });
    }
    
    static updatePlantUnitPerSquareFoot(name, unitPerSquareFoot) {
        Dispatcher.dispatch({
            actionType: Constants.PLANT_UPDATE_UNIT_PER_SQUARE_FOOT,
            name: name,
            unitPerSquareFoot: unitPerSquareFoot
        });
    }
}
