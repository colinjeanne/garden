import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    allPlantNames: [],
    visiblePlantNames: [],
    editing: false,
    sort: (first, second) => first < second,
    filter: () => true
};

const filterPlantName = filteredPlantName =>
    plantName => filteredPlantName !== plantName;

const filterAndSortPlantNames = (state, plantNames) => {
    const filter = state.filter;
    const sort = state.sort;
    
    return plantNames.filter(filter).sort(sort);
};

const reducer = handleActions({
        [Constants.GET_ALL_PLANTS]: (state, action) => ({
            next: (state, action) => {
                if (!action.payload) {
                    return state;
                }
                
                const allPlantNames = action.payload.
                    map(plant => plant.name);
                return {
                    allPlantNames: allPlantNames,
                    visiblePlantNames:
                        filterAndSortPlantNames(allPlantNames)
                };
            }
        }),
        
        [Constants.CREATE_PLANT]: (state, action) => ({
            next: (state, plant) => {
                const allPlantNames = [
                    action.payload.name,
                    ...state.allPlantNames.filter(
                        filterPlantName(action.payload.name))
                ];
                
                return {
                    visiblePlantNames:
                        filterAndSortPlantNames(state, allPlantNames)
                };
            }
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
        
        [Constants.EDIT_PLANT]: () => ({
            editing: true
        }),
        
        [Constants.SAVE_PLANT]: () => ({
            editing: false
        })
    },
    initialState);

export default reducer;