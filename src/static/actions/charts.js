import {
    ADD_CHART,
    LOAD_CHART_REQUEST,
    LOAD_CHART_RESPONSE,
    LOAD_CHART_FAILURE,
    REFRESH_CHART_REQUEST,
    REFRESH_CHART_RESPONSE,
    REFRESH_CHART_FAILURE,
    CLOSE_CHART,
    SET_CHART_POLLING_INTERVAL
} from '../constants';


export function addChart(currencyPair) {
    return (dispatch, getState) => {
        dispatch(addChartAction(currencyPair));
        const chartId = getState().charts.chartIdCounter;

        dispatch(loadChartRequest(chartId));
        getCurrencyDataFromApi(currencyPair)
            .then(response => {
                dispatch(loadChartResponse(chartId, response))
            })
            .catch(error => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    dispatch(loadChartFailure(chartId, 'Server Error'));
                } else {
                    dispatch(
                        loadChartFailure(chartId, 'Connection Error')
                    );
                }
            })
    }
}

function addChartAction(currencyPair) {
    return {
        type: ADD_CHART,
        currencyPair: currencyPair
    }
}

function getCurrencyDataFromApi(currencyPair) { // TODO implement
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.05) {
                reject({response: {status: 500}});
            }
            else if (rand < 0.10) {
                reject(null);
            }
            else {
                resolve(Array.from({length: 50}, () => Math.random() * 10));
            }
        }, 500)
    })
}

function loadChartRequest(chartId) {
    return {
        type: LOAD_CHART_REQUEST,
        chartId: chartId
    }
}

function loadChartResponse(chartId, response) {
    return {
        type: LOAD_CHART_RESPONSE,
        chartId: chartId,
        priceData: response
    }
}

function loadChartFailure(chartId, errorMessage) {
    return {
        type: LOAD_CHART_FAILURE,
        chartId: chartId,
        errorMessage: errorMessage
    }
}

export function refreshChart(chartId) {
    return (dispatch, getState) => {
        const currencyPair = getChartWithId(getState().charts.charts, chartId).currencyPair

        dispatch(refreshChartRequest(chartId));
        getCurrencyDataFromApi(currencyPair)
            .then(response => {
                dispatch(refreshChartResponse(chartId, response))
            })
            .catch(error => {
                if (error && typeof error.response !== 'undefined' && error.response.status >= 500) {
                    dispatch(refreshChartFailure(chartId, 'Server Error'));
                } else {
                    dispatch(
                        refreshChartFailure(chartId, 'Connection Error')
                    );
                }
            })
    }
}

function getChartWithId(charts, chartId) {
    for (const chart of charts) {
        if (chart.id == chartId) return chart;
    }
}

function refreshChartRequest(chartId) {
    return {
        type: REFRESH_CHART_REQUEST,
        chartId: chartId
    }
}

function refreshChartResponse(chartId, response) {
    return {
        type: REFRESH_CHART_RESPONSE,
        chartId: chartId,
        priceData: response
    }
}

function refreshChartFailure(chartId, errorMessage) {
    return {
        type: REFRESH_CHART_FAILURE,
        chartId: chartId,
        errorMessage: errorMessage
    }
}

export function closeChart(chartId) {
    return {
        type: CLOSE_CHART,
        chartId: chartId
    }
}

export function setChartPollingInterval(chartId, pollingInterval) {
    return {
        type: SET_CHART_POLLING_INTERVAL,
        chartId: chartId,
        pollingInterval: pollingInterval
    }
}