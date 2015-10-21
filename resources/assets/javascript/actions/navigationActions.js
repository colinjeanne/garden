import Constants from '../constants/constants';
import { createAction } from 'redux-actions';

const showPage = createAction(Constants.SHOW_PAGE);
const selectPlant = createAction(Constants.SELECT_PLANT);
const filterPlants = createAction(Constants.FILTER_PLANTS);
const sortPlants = createAction(Constants.SORT_PLANTS);
const editPlant = createAction(Constants.EDIT_PLANT);
const savePlant = createAction(Constants.SAVE_PLANT);