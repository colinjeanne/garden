import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    plants: [],
    dirtyByName: []
};

const filterPlant = plantName => plant => plant.name !== plantName;
const filterPlantName = filteredPlantName =>
    plantName => filteredPlantName !== plantName;

const handleUpdatedPlant = (state, action) => {
        const nextState = {
            plants: [
                action.payload,
                ...state.plants.
                    filter(filterPlant(action.payload.name))
            ]
        };
        
        const filteredDirty = state.dirtyByName.
            filter(filterPlantName(action.payload.name));
        if (!action.meta.volatile) {
            nextState.dirtyByName = filteredDirty;
        } else {
            nextState.dirtyByName = [
                action.payload.name,
                ...filteredDirty
            ];
        }
        
        return nextState;
    };

const reducer = handleActions({
        [Constants.GET_ALL_PLANTS]: (state, action) => {
            if (!action.payload || action.error) {
                return state;
            }
            
            return {
                plants: action.payload,
                dirtyByName: []
            };
        },
        
        [Constants.CREATE_PLANT]: (state, action) => ({
            next: handleUpdatedPlant,
            throw: state => state
        }),
        
        [Constants.UPDATE_PLANT]: (state, action) => ({
            next: handleUpdatedPlant,
            throw: state => state
        })
    },
    initialState);

export default reducer;