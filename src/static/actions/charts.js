import {
    ADD_CHART,
    LOAD_CHART_REQUEST,
    LOAD_CHART_RESPONSE,
    LOAD_CHART_FAILURE,
    REFRESH_CHART_REQUEST,
    REFRESH_CHART_RESPONSE,
    REFRESH_CHART_FAILURE,
    CLOSE_CHART,
    SET_CHART_POLLING_INTERVAL,

    DEFAULT_POLLING_INTERVAL
} from '../constants';

import {getCurrencyDataFromApi} from '../utils/currencyApi'
import {saveChartsNoPromise} from "../utils/chartConfig";

export function addChart(currencyPair, pollingInterval=DEFAULT_POLLING_INTERVAL, saveCharts=true) {
    return (dispatch, getState) => {
        dispatch(addChartAction(currencyPair));

        const chartId = getState().charts.chartIdCounter;
        dispatch(setChartPollingInterval(chartId, pollingInterval));
        if (saveCharts) saveChartsNoPromise(getState().charts.charts);

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
    return (dispatch, getState) => {
        dispatch(closeChartAction(chartId));
        saveChartsNoPromise(getState().charts.charts)
    }
}

function closeChartAction(chartId) {
    return {
        type: CLOSE_CHART,
        chartId: chartId
    }
}

export function setChartPollingInterval(chartId, pollingInterval) {
    return (dispatch, getState) => {
        dispatch(setChartPollingIntervalAction(chartId, pollingInterval));
        saveChartsNoPromise(getState().charts.charts)
    }
}

function setChartPollingIntervalAction(chartId, pollingInterval) {
    return {
        type: SET_CHART_POLLING_INTERVAL,
        chartId: chartId,
        pollingInterval: pollingInterval
    }
}