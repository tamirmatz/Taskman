import { utilService } from '../../services/generalService/utilService';

export function loading() { // Action Creator
    return async dispatch => {
        try {   
            dispatch('LOADING_DONE');         
            dispatch('LOADING_START');
            setTimeout(() => {
                dispatch('LOADING_DONE');
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }
}