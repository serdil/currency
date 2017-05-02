import {
    FETCH_CURRENCY_PAIRS_FAILURE,
    FETCH_CURRENCY_PAIRS_RESPONSE
} from '../constants';

import {getCurrencyPairsFromApi} from '../utils/currencyApi'

export function fetchCurrencyPairs(callback) {
    return (dispatch) => {
        getCurrencyPairsFromApi()
            .then(response => {
                dispatch(fetchCurrencyPairsResponse(response));
                callback()
            })
            .catch(error => {
                dispatch(fetchCurrencyPairsFailure());
                callback(true)
            });
    }
}

function fetchCurrencyPairsResponse(response) {
    return {
        type: FETCH_CURRENCY_PAIRS_RESPONSE,
        currencyPairs: response
    }
}

function fetchCurrencyPairsFailure() {
    return {
        type: FETCH_CURRENCY_PAIRS_FAILURE
    }
}
