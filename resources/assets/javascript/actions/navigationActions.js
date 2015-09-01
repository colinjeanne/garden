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
