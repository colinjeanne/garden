import Constants from '../constants/constants';
import { createAction } from 'redux-actions';
import { fetch, Headers } from 'isomorphic-fetch';

const getAllPlantsAction = createAction(Constants.GET_ALL_PLANTS);

const createPlantFromName = name => ({
    difficulty: 1,
    growTime: 'P1M',
    harvestTime: 'P1M',
    label: '',
    name: name,
    notes: '',
    pricePerUnit: 1.0,
    rarity: 1,
    taste: 1,
    unit: '',
    unitPerSquareFoot: 1.0,
    value: 1
});

const getIdTokenFromState = state => state.user.idToken;
const getPlantFromState = (plantName, state) =>
    state.plants.plants.find(plant => plant.name === plantName);

const value = plant =>
    plant.pricePerUnit *
    plant.unitPerSquareFoot *
    plant.rarity *
    plant.taste /
    plant.difficulty;

const getGetHeaders = idToken =>
    new Headers({
        'Authorization': `Bearer ${idToken}`,
        'Accept': 'application/json'
    });

const getPostOrPutHeaders = idToken =>
    new Headers({
        'Authorization': `Bearer ${idToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });

export const getAllPlants = () => (dispatch, getState) => {
    dispatch(getAllPlantsAction());
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        '/plants',
        {
            method: 'GET',
            headers: getGetHeaders(idToken)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(getAllPlantsAction(json))).
    catch(err => dispatch({
        type: Constants.GET_ALL_PLANTS,
        payload: err,
        error: true
    }));
};

export const createPlant = plantName => (dispatch, getState) => {
    const plant = createPlantFromName(plantName);
    dispatch({
        type: Constants.CREATE_PLANT,
        payload: plant,
        meta: {
            volatile: true
        }
    });
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        '/plants',
        {
            method: 'POST',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(plant)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch({
        type: Constants.CREATE_PLANT,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.CREATE_PLANT,
        payload: err,
        error: true,
        meta: {
            name: plantName
        }
    }));
};

export const updatePlant = (plantName, change) => (dispatch, getState) => {
    const plant = getPlantFromState(plantName, getState());
    const updatedPlant = Object.assign({}, plant, change);
    updatePlant.value = value(updatedPlant);
    
    dispatch({
        type: Constants.UPDATE_PLANT,
        payload: updatedPlant,
        meta: {
            volatile: true
        }
    });
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        `/plants/${plantName}`,
        {
            method: 'PUT',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(updatedPlant)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch({
        type: Constants.UPDATE_PLANT,
        payload: json
    })).
    catch(err => dispatch({
        type: Constants.UPDATE_PLANT,
        payload: err,
        error: true,
        meta: {
            name: plantName
        }
    }));
};