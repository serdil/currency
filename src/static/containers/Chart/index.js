import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PricePlot from '../../components/PricePlot'

import {
    POLLING_INTERVALS,
    DEFAULT_POLLING_INTERVAL
} from '../../constants';

import * as chartActions from '../../actions/charts';


class ChartView extends React.Component {

    static propTypes = {
        chart: PropTypes.object,
        closeChart: PropTypes.func,
        refreshChart: PropTypes.func,
        setChartPollingInterval: PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            timeElapsedSinceLastRefresh: 0
        };

        this.scheduleRefreshes();
    }

    componentWillUnmount() {
        clearInterval(this.refreshIntervalId)
    }

    scheduleRefreshes = () => {
        this.refreshIntervalId = setInterval(this.incrementTimeAndRefreshIfNecessary, 1000)
    };

    incrementTimeAndRefreshIfNecessary = () => {
        this.setState((state) => {
            if (state.timeElapsedSinceLastRefresh >= this.getChart().pollingInterval) {
                this.refreshChart();
                return {timeElapsedSinceLastRefresh: 0}
            } else {
                return {timeElapsedSinceLastRefresh: state.timeElapsedSinceLastRefresh+1}
            }
        })
    };

    getChart = () => {
        return this.props.chart
    };

    isChartRefreshing = () => {
        return this.getChart().isRefreshing
    };

    isChartRefreshFailed = () => {
        return this.getChart().isRefreshFailed
    };

    isChartRefreshed = () => {
        return this.getChart().isRefreshed
    };

    isChartLoading = () => {
        return this.getChart().isLoading
    };

    isChartLoaded = () => {
        return this.getChart().isLoaded
    };

    isChartLoadFailed = () => {
        return this.getChart().isLoadFailed
    };

    isDataAvailable = () => {
        return this.isChartRefreshed() || this.isChartLoaded()
    };

    refreshChart = () => {
        this.props.refreshChart(this.getChart().id)
    };

    onPollingIntervalDropdownChange = (evt) => {
        this.props.setChartPollingInterval(this.getChart().id, Number(evt.target.value))
    };

    onCloseButtonClick = () => {
        this.props.closeChart(this.getChart().id)
    };

    getPriceData = () => {
        return this.getChart().priceData;
    };

    getCurrentPrice = () => {
        const priceData = this.getPriceData();
        return priceData[priceData.length-1]
    };

    getCurrencyName = () => {
        return this.getChart().currencyPair
    };

    getCurrentPriceView = () => {
        if (this.isDataAvailable()) {
            return <div>{this.getCurrentPrice()}</div>
        }
    };

    getPriceDataPlotView = () => {
        if (this.isDataAvailable()) {
            return <PricePlot priceData={this.getPriceData()}/>
        }
    };

    getCloseButtonView = () => {
        return <button onClick={this.onCloseButtonClick}>close</button>
    };

    getCurrencyNameView = () => {
        return <div>{this.getCurrencyName()}</div>
    };

    getPollingIntervalOptions = () => {
        return POLLING_INTERVALS
    };

    getPollingIntervalDropdownOptionViews = () => {
        return this.getPollingIntervalOptions()
            .map(seconds => (<option key={seconds} value={seconds}>{seconds}s</option>))
    };

    getPollingIntervalDropdownView = () => {
        return (
            <select defaultValue={DEFAULT_POLLING_INTERVAL} onChange={this.onPollingIntervalDropdownChange}>
                {this.getPollingIntervalDropdownOptionViews()}
            </select>
        )
    };

    getChartLoadingView = () => {
        if (this.isChartLoading()) return <div>loading</div>
    };

    getChartLoadErrorView = () => {
        if (this.isChartLoadFailed() && !this.isDataAvailable()) {
            return <div>load: {this.getChart().loadFailedErrorMessage}</div>
        }
    };

    getChartRefreshingView = () => {
        if (this.isChartRefreshing()) return <div>refreshing</div>
    };

    getChartRefreshErrorView = () => {
        if (this.isChartRefreshFailed()) return <div>refresh: {this.getChart().refreshFailedErrorMessage}</div>
    };

    getChartView = () => {
        return (
            <div style={{padding: '10px', margin: '10px'}}>
                {this.getCurrencyNameView()}
                {this.getCurrentPriceView()}
                {this.getChartLoadingView()}
                {this.getChartLoadErrorView()}
                {this.getChartRefreshingView()}
                {this.getChartRefreshErrorView()}
                {this.getPollingIntervalDropdownView()}
                {this.getPriceDataPlotView()}
                {this.getCloseButtonView()}
            </div>
        )
    };

    render() {
        return (
            <div className="container">
                {this.getChartView()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(chartActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartView);
export { ChartView as ChartViewNotConnected };
