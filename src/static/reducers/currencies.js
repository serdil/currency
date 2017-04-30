import {
    FETCH_CURRENCY_PAIRS_RESPONSE,
    FETCH_CURRENCY_PAIRS_FAILURE
} from '../constants';


const initialState = {
    currencyPairs: null,
    defaultCurrency: null,
    isCurrencyPairsLoaded: false,
    isCurrencyPairsLoadError: false
};

export default function (state=initialState, action) {
    switch (action.type) {
        case FETCH_CURRENCY_PAIRS_RESPONSE:
            return fetchCurrencyPairsResponse(state, action);
        case FETCH_CURRENCY_PAIRS_FAILURE:
            return fetchCurrencyPairsFailure(state, action);
        default:
            return state;
    }
}

function fetchCurrencyPairsResponse(state, action) {
    return Object.assign({}, state, {
        isCurrencyPairsLoaded: true,
        isCurrencyPairsLoadError: false,
        currencyPairs: action.currencyPairs,
        defaultCurrency: action.currencyPairs[0]
    });
}

function fetchCurrencyPairsFailure(state, action) {
    return Object.assign({}, state, {
        isCurrencyPairsLoaded: false,
        isCurrencyPairsLoadError: true,
    });
}
