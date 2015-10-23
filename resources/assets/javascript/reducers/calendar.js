import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    events: [],
    dirtyById: []
};

const areEventsEqual = (first, second) =>
    first.plantName === second.plantName &&
    first.plantedDate === second.plantedDate;

const filterEvent = filteredEvent =>
    event => !areEventsEqual(filteredEvent, event);

const filterEventId = filteredEventId =>
    eventId => filteredEventId !== eventId;

const handleUpdatedEvent = (state, action) => {
        const nextState = {
            events: [
                action.payload,
                ...state.plants.
                    filter(filterEvent(action.payload))
            ]
        };
        
        const filteredDirty = state.dirtyById.
            filter(filterEventId(action.payload));
        if (!action.meta.volatile) {
            nextState.dirtyById = filteredDirty;
        } else {
            nextState.dirtyById = [
                action.payload.id,
                ...filteredDirty
            ];
        }
        
        return nextState;
    };

const reducer = handleActions({
        [Constants.GET_CALENDAR_EVENTS]: (state, action) => {
            if (!action.payload || action.error) {
                return state;
            }
            
            return {
                plants: action.payload,
                dirtyById: []
            };
        },
        
        [Constants.CREATE_CALENDAR_EVENT]: (state, action) => ({
            next: handleUpdatedEvent,
            throw: state => state
        }),
        
        [Constants.ADD_HARVEST]: (state, action) => ({
            next: handleUpdatedEvent,
            throw: state => state
        }),
        
        [Constants.DELAY_HARVEST]: (state, action) => ({
            next: handleUpdatedEvent,
            throw: state => state
        }),
        
        [Constants.PLANT_DIED]: (state, action) => ({
            next: handleUpdatedEvent,
            throw: state => state
        })
    },
    initialState);

export default reducer;