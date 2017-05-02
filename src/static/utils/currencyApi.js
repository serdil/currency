import fetch from 'isomorphic-fetch'

import {checkHttpStatus, parseJSON} from './index'

export function getCurrencyDataFromApi(currencyPair) {
    return fetch(getURLForCurrencyPair(currencyPair), {
        headers: {
            Accept: 'application/json',
        }
    })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            const size = response.length;
            const startIndex = size-50 >= 0 ? size-50 : 0;
            return response.map(obj => obj.selling).slice(startIndex, size)
        })
}

function getURLForCurrencyPair(currencyPair) {
    const nonTRYPart = getNonTRYPart(currencyPair);
    return `http://doviz.com/api/v1/currencies/${nonTRYPart}/daily`
}

function getNonTRYPart(currencyPair) {
    return currencyPair.slice(0,3)
}

export function getCurrencyPairsFromApi() {
    return fetch(getCurrencyPairsURL(), {
        headers: {
            Accept: 'application/json',
        }
    })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(response => {
            return response.map(obj => obj.code + '-TRY').sort()
        })
}

function getCurrencyPairsURL() {
    return 'http://www.doviz.com/api/v1/currencies/all/latest'
}