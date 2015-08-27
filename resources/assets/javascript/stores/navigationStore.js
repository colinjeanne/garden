import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';

const NAVIGATE_EVENT = 'navigate';

const CALENDAR_PAGE = 'calendar';
const PLANTS_PAGE = 'plants';
const PLANTING_SUMMARY_PAGE = 'plantingSummary';
const SPACE_PLANNING_PAGE = 'spacePlanning';

let currentPage = null;

class NavigationStore extends EventEmitter {
    getAllPages() {
        return [
            {
                key: CALENDAR_PAGE,
                title: 'Calendar'
            },
            {
                key: PLANTS_PAGE,
                title: 'Plants'
            },
            {
                key: PLANTING_SUMMARY_PAGE,
                title: 'Planting Summary'
            },
            {
                key: SPACE_PLANNING_PAGE,
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

Dispatcher.register(action => {
    switch (action.actionType) {
        case Constants.SHOW_PAGE:
            currentPage = action.page;
            navigationStore.emitChange();
            break;
    }
});

export default navigationStore;