import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';
import moment from 'moment';

const initialState = {
    endDate: moment.utc().
        add(1, 'month').
        endOf('month').
        format('YYYY-MM-DDThh:mm:ssZ'),
    startDate: moment.utc().
        startOf('month').
        format('YYYY-MM-DDThh:mm:ssZ')
};

const reducer = handleActions({
        [Constants.CHANGE_SUMMARY_END_DATE]: (state, action) =>
            Object.assign(
                {},
                state,
                {
                    endDate: moment.
                        utc([action.payload.year, action.payload.month]).
                        endOf('month').
                        format('YYYY-MM-DDThh:mm:ssZ')
                }),
        
        [Constants.CHANGE_SUMMARY_START_DATE]: (state, action) =>
            Object.assign(
                {},
                state,
                {
                    startDate: moment.
                        utc([action.payload.year, action.payload.month]).
                        format('YYYY-MM-DDThh:mm:ssZ')
                })
    },
    initialState);

export default reducer;