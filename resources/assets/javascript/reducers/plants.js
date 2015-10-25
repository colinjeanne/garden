import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    plants: [],
    dirtyByName: [],
    visibleByName: [],
    sort: (first, second) => first < second,
    filter: () => true
};

const filterPlant = plantName => plant => plant.name !== plantName;
const filterPlantName = filteredPlantName =>
    plantName => filteredPlantName !== plantName;

const filterAndSortPlantNames = (state, plants) => {
    const filter = state.filter;
    const sort = state.sort;
    
    return plants.filter(filter).sort(sort);
};

const handleUpdatedPlant = (state, action) => {
        const nextState = {
            plants: [
                action.payload,
                ...state.plants.
                    filter(filterPlant(action.payload.name))
            ]
        };
        
        nextState.visibleByName = filterAndSortPlantNames(
            state,
            nextState.plants);
        
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
                dirtyByName: [],
                visibleByName: filterAndSortPlantNames(state, action.payload)
            };
        },
        
        [Constants.CREATE_PLANT]: (state, action) => ({
            next: handleUpdatedPlant,
            throw: state => state
        }),
        
        [Constants.UPDATE_PLANT]: (state, action) => ({
            next: handleUpdatedPlant,
            throw: state => state
        }),
        
        [Constants.SELECT_PLANT]: (state, action) => ({
            selectedPlantName: action.payload
        }),
        
        [Constants.FILTER_PLANTS]: (state, action) => ({
            filter: action.payload,
            visiblePlantNames:
                filterAndSortPlantNames(state, state.allPlantNames)
        }),
        
        [Constants.SORT_PLANTS]: (state, action) => ({
            sort: action.payload,
            visiblePlantNames:
                filterAndSortPlantNames(state, state.allPlantNames)
        }),
    },
    initialState);

export default reducer;