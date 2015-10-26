import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    page: Constants.pages.CALENDAR
};

const reducer = handleActions({
        [Constants.SHOW_PAGE]: (state, action) => ({
            page: action.payload
        })
    },
    initialState);

export default reducer;