import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    editing: false
};

const reducer = handleActions({
        [Constants.EDIT_PLANT]: state => ({
            ...state,
            editing: true
        }),
        
        [Constants.SAVE_PLANT]: state => ({
            ...state,
            editing: false
        })
    },
    initialState);

export default reducer;