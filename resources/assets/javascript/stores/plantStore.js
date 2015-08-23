import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';

const CHANGE_EVENT = 'change';
let plants = new Map();

const create = name => plants.set(
    name,
    {
        difficulty: 1,
        growTime: 1,
        label: '',
        name: name,
        notes: '',
        pricePerUnit: 1.0,
        rarity: 1,
        taste: 1,
        unit: '',
        unitPerSquareFoot: 1.0,
        value: 1
    });

const destroy = name => plants.delete(name);

const value = plant =>
    plant.pricePerUnit *
    plant.unitPerSquareFoot *
    plant.rarity *
    plant.taste /
    plant.difficulty;

const update = (name, updates) => {
    const plant = Object.assign({}, plants.get(name), updates);
    plant.value = value(plant);
    
    plants.set(name, plant);
};

class PlantStore extends EventEmitter {
    getAll() {
        return plants;
    }
    
    getByName(name) {
        return plants.get(name);
    }
    
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const plantStore = new PlantStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case Constants.PLANT_CREATE:
            create(action.name);
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_DESTROY:
            destroy(action.name);
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_DIFFICULTY:
            update(action.name, {difficulty: action.difficulty});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_GROWTIME:
            update(action.name, {growTime: action.growTime});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_LABEL:
            update(action.name, {label: action.label});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_NOTES:
            update(action.name, {notes: action.notes});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_PRICE_PER_UNIT:
            update(action.name, {pricePerUnit: action.pricePerUnit});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_RARITY:
            update(action.name, {rarity: action.rarity});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_TASTE:
            update(action.name, {taste: action.taste});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_UNIT:
            update(action.name, {unit: action.unit});
            plantStore.emitChange();
            break;
        
        case Constants.PLANT_UPDATE_UNIT_PER_SQUARE_FOOT:
            update(action.name, {unitPerSquareFoot: action.unitPerSquareFoot});
            plantStore.emitChange();
            break;
    }
});

export default plantStore;