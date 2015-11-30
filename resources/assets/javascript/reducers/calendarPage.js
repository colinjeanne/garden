import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';
import moment from 'moment';

const initialState = {
    currentDate: moment.
        utc().
        format('YYYY-MM-DDThh:mm:ssZ')
};

const reducer = handleActions({
        [Constants.UPDATE_CURRENT_DATE]: (state, action) =>
            Object.assign(
                {},
                state,
                {
                    currentDate: moment.
                        utc(action.payload).
                        format('YYYY-MM-DDThh:mm:ssZ')
                })
    },
    initialState);

export default reducer;