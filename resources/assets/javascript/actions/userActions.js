import Dispatcher from '../dispatcher/dispatcher';
import Constants from '../constants/constants';

export default class UserActions {
    static signInUser(user) {
        Dispatcher.dispatch({
            actionType: Constants.USER_SIGNIN,
            user: user
        });
    }
}
