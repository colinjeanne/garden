import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    'plants': [],
    'dirtyByName': [],
    'uploadingByName': []
};

const reducer = handleActions({
    [Constants.CREATE_PLANT]: (state, action) => {
        //
    }
});

export default reducer;