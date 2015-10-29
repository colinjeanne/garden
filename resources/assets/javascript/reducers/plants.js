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

const filterAndSortPlantNames = (filter, sort, plants) => {
    return plants.filter(filter).sort(sort).map(plant => plant.name);
};

const handleUpdatedPlant = (state, action) => {
        const nextState = {
            ...state,
            plants: [
                action.payload,
                ...state.plants.
                    filter(filterPlant(action.payload.name))
            ]
        };
        
        nextState.visibleByName = filterAndSortPlantNames(
            state.filter,
            state.sort,
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
                ...state,
                plants: action.payload,
                dirtyByName: [],
                visibleByName: filterAndSortPlantNames(
                    state.filter,
                    state.sort,
                    action.payload)
            };
        },
        
        [Constants.CREATE_PLANT]: {
            next: handleUpdatedPlant,
            throw: state => state
        },
        
        [Constants.UPDATE_PLANT]: {
            next: handleUpdatedPlant,
            throw: state => state
        },
        
        [Constants.SELECT_PLANT]: (state, action) => ({
            ...state,
            selectedPlantName: action.payload
        }),
        
        [Constants.FILTER_PLANTS]: (state, action) => ({
            ...state,
            filter: action.payload,
            visibleByName:
                filterAndSortPlantNames(
                    action.payload,
                    state.sort,
                    state.plants)
        }),
        
        [Constants.SORT_PLANTS]: (state, action) => ({
            ...state,
            sort: action.payload,
            visibleByName:
                filterAndSortPlantNames(
                    state.filter,
                    action.payload,
                    state.plants)
        }),
    },
    initialState);

export default reducer;