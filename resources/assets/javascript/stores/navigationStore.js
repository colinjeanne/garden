import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';

const NAVIGATE_EVENT = 'navigate';

let currentPage = null;

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
    }
});

export default navigationStore;