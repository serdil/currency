import {
    FETCH_CURRENCY_PAIRS_FAILURE,
    FETCH_CURRENCY_PAIRS_RESPONSE
} from '../constants';


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

function getCurrencyPairsFromApi() { // TODO implement
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.10) {
                reject(null);
            }
            else {
                resolve(['EUR-TRY', 'USD-TRY', 'CAD-TRY', 'NZD-TRY']);
            }
        }, 500)
    })
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
