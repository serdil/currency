import fetch from 'isomorphic-fetch'

import {checkHttpStatus, parseJSON } from './index'

import { SERVER_URL } from './config'

export function getInitialChartConfig() {
    return fetch(getChartConfigApiURL(), {
        headers: {
            Accept: 'application/json'
        }
    })
        .then(checkHttpStatus)
        .then(parseJSON)
}

export function saveChartsNoPromise(charts) {
    saveCharts(charts)
        .then(() => console.log('Chart config saved.'))
        .catch((err) => {
            console.error(err)
        })
}

export function saveCharts(charts) {
    const chartConfig = charts.map(chart => {
        return {currencyPair: chart.currencyPair, pollingInterval: chart.pollingInterval}
    });
    return saveChartConfig(chartConfig);
}

export function saveChartConfig(chartConfig) {
    return fetch(getChartConfigApiURL(), {
        method: 'PUT',
        body: JSON.stringify(chartConfig),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(checkHttpStatus)
        .then(parseJSON)
}

function getChartConfigApiURL() {
    return `${SERVER_URL}/api/v1/chartconfig/`
}