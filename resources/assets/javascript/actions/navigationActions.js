import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

export default class NavigationActions {
    static showPage(page) {
        Dispatcher.dispatch({
            actionType: Constants.SHOW_PAGE,
            page: page
        });
    }
    
    static selectPlant(plantName) {
        Dispatcher.dispatch({
            actionType: Constants.SELECT_PLANT,
            plantName: plantName
        });
    }
    
    static edit() {
        Dispatcher.dispatch({
            actionType: Constants.EDIT
        });
    }
    
    static save() {
        Dispatcher.dispatch({
            actionType: Constants.SAVE
        });
    }
    
    static filterPlants(filterString) {
        Dispatcher.dispatch({
            actionType: Constants.FILTER_PLANTS,
            filterString: filterString
        });
    }
    
    static updateSortType(sortType) {
        Dispatcher.dispatch({
            actionType: Constants.SORT_PLANTS,
            sortType: sortType
        });
    }
}
