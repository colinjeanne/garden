import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    editing: false
};

const reducer = handleActions({
        [Constants.EDIT_PLANT]: (state, action) =>
            Object.assign(
                {},
                state,
                { editing: action.payload.editing })
    },
    initialState);

export default reducer;