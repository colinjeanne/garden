import Constants from '../constants/constants';
import { handleActions } from 'redux-actions';

const initialState = {
    events: [],
    dirtyById: []
};

const areEventsEqual = (first, second) => first.id === second.id;

const filterEvent = filteredEvent =>
    event => !areEventsEqual(filteredEvent, event);

const filterEventId = filteredEventId =>
    eventId => filteredEventId !== eventId;

const handleUpdatedEvent = (state, action) => {
    const nextState = Object.assign(
        {},
        state,
        {
            events: [
                ...state.events.
                    filter(filterEvent(action.payload))
            ],
            
            dirtyById: [
                ...state.dirtyById.
                    filter(filterEventId(action.payload.id))
            ]
        });
    
    if (!action.meta || !action.meta.volatile) {
        nextState.events.push(action.payload);
    } else {
        nextState.dirtyById.push(action.payload.id);
    }
    
    return nextState;
};

const reducer = handleActions({
        [Constants.GET_CALENDAR_EVENTS]: (state, action) => {
            if (!action.payload || action.error) {
                return state;
            }
            
            return Object.assign(
                {},
                state,
                {
                    events: action.payload,
                    dirtyById: []
                });
        },
        
        [Constants.CREATE_CALENDAR_EVENT]: {
            next: handleUpdatedEvent,
            throw: state => state
        },
        
        [Constants.ADD_HARVEST]: {
            next: handleUpdatedEvent,
            throw: state => state
        },
        
        [Constants.DELAY_HARVEST]: {
            next: handleUpdatedEvent,
            throw: state => state
        },
        
        [Constants.PLANT_DIED]: {
            next: handleUpdatedEvent,
            throw: state => state
        }
    },
    initialState);

export default reducer;