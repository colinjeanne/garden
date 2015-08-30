import Dispatcher from '../dispatcher/dispatcher';
import {EventEmitter} from 'events';
import Constants from '../constants/constants';

const CHANGE_EVENT = 'change';

let profile = null;

class UserStore extends EventEmitter {
    getDisplayName() {
        if (!this.isUserSignedIn()) {
            throw new Error('No user is signed in');
        }
        
        return profile.getName();
    }
    
    isUserSignedIn() {
        return profile !== null;
    }
    
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }
    
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
}

const userStore = new UserStore();

userStore.dispatchToken = Dispatcher.register(action => {
    switch (action.actionType) {
        case Constants.USER_SIGNIN:
            profile = action.user.getBasicProfile();
            userStore.emitChange();
            break;
    }
});

export default userStore;