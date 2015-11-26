import Constants from '../constants/constants';
import { createAction } from 'redux-actions';

export const showPage = createAction(Constants.SHOW_PAGE);
export const selectPlant = createAction(Constants.SELECT_PLANT);
export const filterPlants = createAction(Constants.FILTER_PLANTS);
export const sortPlants = createAction(Constants.SORT_PLANTS);
export const editPlant = createAction(Constants.EDIT_PLANT);
export const savePlant = createAction(Constants.SAVE_PLANT);
export const changeSummaryStartDate =
    createAction(Constants.CHANGE_SUMMARY_START_DATE);
export const changeSummaryEndDate =
    createAction(Constants.CHANGE_SUMMARY_END_DATE);