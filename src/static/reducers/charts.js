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


const initialState = {
    charts: [],
    chartIdCounter: 0
};

export default function (state=initialState, action) {
    switch (action.type) {
        case ADD_CHART:
            return addChart(state, action);
        case LOAD_CHART_REQUEST:
            return loadChartRequest(state, action);
        case LOAD_CHART_RESPONSE:
            return loadChartResponse(state, action);
        case LOAD_CHART_FAILURE:
            return loadChartFailure(state, action);
        case SET_CHART_POLLING_INTERVAL:
            return setChartPollingInterval(state, action);
        case REFRESH_CHART_REQUEST:
            return refreshChartRequest(state, action);
        case REFRESH_CHART_RESPONSE:
            return refreshChartResponse(state, action);
        case REFRESH_CHART_FAILURE:
            return refreshChartFailure(state, action);
        case CLOSE_CHART:
            return closeChart(state, action);
        default:
            return state;
    }
}

function addChart(state, action) {
    return {
        charts: [...state.charts, newChart(state.chartIdCounter+1, action.currencyPair)],
        chartIdCounter: state.chartIdCounter+1
    }
}

function newChart(chartId, currencyPair) {
    return {
        id: chartId,
        currencyPair: currencyPair,
        isLoading: true,
        isLoaded: false,
        isLoadFailed: false,
        loadFailedErrorMessage: null,
        pollingInterval: 10,
        currentPrice: null,
        isRefreshing: false,
        isRefreshed: false,
        isRefreshFailed: false,
        refreshFailedErrorMessage: null
    }
}

function loadChartRequest(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {isLoading: true, isLoaded: false, isLoadFailed: false})
    );

    return Object.assign({}, state, {charts: newCharts});
}

function loadChartFailure(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {
            isLoading: false,
            isLoaded: false,
            isLoadFailed: true,
            loadFailedErrorMessage: action.errorMessage
        })
    );

    return Object.assign({}, state, {charts: newCharts});
}

function loadChartResponse(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {
            isLoading: false,
            isLoaded: true,
            isLoadFailed: false,
            currentPrice: action.currentPrice
        })
    );

    return Object.assign({}, state, {charts: newCharts});
}

function transformSingleChart(charts, chartId, transformationFunction) {
    const newCharts = [];
    for (const chart of charts) {
        if (chart.id === chartId) {
            newCharts.push(transformationFunction(chart))
        } else {
            newCharts.push(chart);
        }
    }
    return newCharts
}


function setChartPollingInterval(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {pollingInterval: action.pollingInterval})
    );

    return Object.assign({}, state, {charts: newCharts});
}

function refreshChartRequest(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {
            isRefreshing: true,
            isRefreshed: false,
            isRefreshFailed: false
        })
    );

    return Object.assign({}, state, {charts: newCharts});
}

function refreshChartResponse(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {
            isRefreshing: false,
            isRefreshed: true,
            isRefreshFailed: false,
            currentPrice: action.currentPrice
        })
    );

    return Object.assign({}, state, {charts: newCharts});
}

function refreshChartFailure(state, action) {
    const newCharts = transformSingleChart(
        state.charts,
        action.chartId,
        chart => Object.assign({}, chart, {
            isRefreshing: false,
            isRefreshed: true,
            isRefreshFailed: true,
            refreshFailedErrorMessage: action.errorMessage
        })
    );

    return Object.assign({}, state, {charts: newCharts});
}

function closeChart(state, action) {
    return Object.assign({}, state, {charts: removeChartWithId(state.charts, action.chartId)});
}

function removeChartWithId(charts, id) {
    const newCharts = [];
    for (const chart of charts) {
        if (chart.id != id) newCharts.push(chart);
    }
    return newCharts;
}