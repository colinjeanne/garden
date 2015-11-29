import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    plants: [],
    dirty: [],
    visibleByName: [],
    sort: (first, second) =>
        first.name < second.name ? -1 :
            first.name > second.name ? 1 : 0,
    filter: () => true
};

const filterPlant = plantName => plant => plant.name !== plantName;

const filterAndSortPlantNames = (filter, sort, plants) => {
    return plants.filter(filter).sort(sort).map(plant => plant.name);
};

const handleUpdatedPlant = (state, action) => {
    const nextState = Object.assign(
        {},
        state,
        {
            plants: [
                action.payload,
                ...state.plants.
                    filter(filterPlant(action.payload.name))
            ],
            
            dirty: [
                ...state.dirty.
                    filter(filterPlant(action.payload.name))
            ]
        });
    
    nextState.visibleByName = filterAndSortPlantNames(
        state.filter,
        state.sort,
        nextState.plants);
    
    if (!action.meta || !action.meta.volatile) {
        nextState.plants.push(action.payload);
    } else {
        nextState.dirty.push(action.payload);
    }
    
    return nextState;
};

const reducer = handleActions({
        [Constants.GET_ALL_PLANTS]: (state, action) => {
            if (!action.payload || action.error) {
                return state;
            }
            
            return Object.assign(
                {},
                state,
                {
                    plants: action.payload,
                    dirty: [],
                    visibleByName: filterAndSortPlantNames(
                        state.filter,
                        state.sort,
                        action.payload)
                });
        },
        
        [Constants.CREATE_PLANT]: {
            next: handleUpdatedPlant,
            throw: state => state
        },
        
        [Constants.UPDATE_PLANT]: {
            next: handleUpdatedPlant,
            throw: state => state
        },
        
        [Constants.SELECT_PLANT]: (state, action) =>
            Object.assign(
                {},
                state,
                { selectedPlantName: action.payload }),
        
        [Constants.FILTER_PLANTS]: (state, action) =>
            Object.assign(
                {},
                state,
                {
                    filter: action.payload,
                    visibleByName:
                        filterAndSortPlantNames(
                            action.payload,
                            state.sort,
                            state.plants)
                }),
        
        [Constants.SORT_PLANTS]: (state, action) =>
            Object.assign(
                {},
                state,
                {
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