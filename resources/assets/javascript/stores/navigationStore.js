import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';

const NAVIGATE_EVENT = 'navigate';

let currentPage = null;
let selectedPlantName = null;
let filterString = '';
let sortType = Constants.SORT_TYPE_ALPHABETICAL;

class NavigationStore extends EventEmitter {
    getAllPages() {
        return [
            {
                key: Constants.CALENDAR_PAGE,
                title: 'Calendar'
            },
            {
                key: Constants.PLANTS_PAGE,
                title: 'Plants'
            },
            {
                key: Constants.PLANTING_SUMMARY_PAGE,
                title: 'Planting Summary'
            },
            {
                key: Constants.SPACE_PLANNING_PAGE,
                title: 'Space Planning'
            }
        ];
    }
    
    getCurrentPage() {
        return currentPage;
    }
    
    getSelectedPlantName() {
        return selectedPlantName;
    }
    
    getFilterString() {
        return filterString;
    }
    
    getSortType() {
        return sortType;
    }
    
    emitChange() {
        this.emit(NAVIGATE_EVENT);
    }
    
    addChangeListener(callback) {
        this.on(NAVIGATE_EVENT, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(NAVIGATE_EVENT, callback);
    }
}

const navigationStore = new NavigationStore();

navigationStore.dispatchToken = Dispatcher.register(action => {
    switch (action.actionType) {
        case Constants.SHOW_PAGE:
            currentPage = action.page;
            navigationStore.emitChange();
            break;
            
        case Constants.SELECT_PLANT:
            selectedPlantName = action.plantName;
            navigationStore.emitChange();
            break;
            
        case Constants.FILTER_PLANTS:
            filterString = action.filterString;
            navigationStore.emitChange();
            break;
        
        case Constants.SORT_PLANTS:
            sortType = action.sortType;
            navigationStore.emitChange();
            break;
    }
});

export default navigationStore;