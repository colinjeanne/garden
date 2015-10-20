import Constants from '../constants/constants';
import { createAction } from 'redux-actions';
import { fetch, Headers } from 'isomorphic-fetch';

const getAllPlantsAction = createAction(Constants.GET_ALL_PLANTS);
const createPlantAction = createAction(Constants.CREATE_PLANT);
const updatePlantAction = createAction(Constants.UPDATE_PLANT);

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
    dispatch(createPlantAction(plant));
    
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
    then(json => dispatch(createPlantAction(json))).
    catch(err => dispatch({
        type: Constants.CREATE_PLANT,
        payload: err,
        error: true,
        meta: {
            name: plantName
        }
    }));
};

export const updatePlant = plantName => (dispatch, getState) => {
    const plant = createPlantFromName(plantName);
    dispatch(updatePlantAction(plant));
    
    const idToken = getIdTokenFromState(getState());
    return fetch(
        `/plants/${plantName}`,
        {
            method: 'PUT',
            headers: getPostOrPutHeaders(idToken),
            body: JSON.stringify(plant)
        }).
    then(response => {
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        
        return response.json();
    }).
    then(json => dispatch(updatePlantAction(json))).
    catch(err => dispatch({
        type: Constants.UPDATE_PLANT,
        payload: err,
        error: true,
        meta: {
            name: plantName
        }
    }));
};