import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const reducer = handleActions({
        [Constants.USER_SIGNIN]: (state, action) => ({
            next: (state, action) => ({
                idToken: action.payload.user.getAuthResponse()['id_token'],
                name: action.payload.user.getBasicProfile().getName()
            }),
            throw: state => state
        })
    });

export default reducer;