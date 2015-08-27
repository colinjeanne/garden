import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

export default class NavigationActions {
    static showPage(page) {
        Dispatcher.dispatch({
            actionType: Constants.SHOW_PAGE,
            page: page
        });
    }
}
