import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import PricePlot from '../../components/PricePlot'

import {
    POLLING_INTERVALS
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

    getPollingInterval = () => {
        return this.getChart().pollingInterval
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
            return (
                <Col>
                    <div>{this.getCurrentPrice()}</div>
                </Col>
            )
        }
    };

    getPriceDataPlotView = () => {
        if (this.isDataAvailable()) {
            return <PricePlot priceData={this.getPriceData()}/>
        }
    };

    getCloseButtonView = () => {
        return (
            <Col>
                <div>
                    <button onClick={this.onCloseButtonClick}>X</button>
                </div>
            </Col>
        )
    };

    getCurrencyNameView = () => {
        return (
            <Col>
                <div>{this.getCurrencyName()}</div>
            </Col>
        )
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
            <Col>
                <div>
                    <select value={this.getPollingInterval()} onChange={this.onPollingIntervalDropdownChange}>
                        {this.getPollingIntervalDropdownOptionViews()}
                    </select>
                </div>
            </Col>
        )
    };


    getChartLoadingSpinnerView = () => {
        if (this.isChartLoading()) {
            return (
                <Row center="xs">
                    <div>loading...</div>
                </Row>
            )
        }
    };

    getChartLoadErrorView = () => {
        if (this.isChartLoadFailed() && !this.isDataAvailable()) {
            return (
                <Row center="xs">
                    <div>load: {this.getChart().loadFailedErrorMessage}</div>
                </Row>
            )
        }
    };

    getChartRefreshingOrRefreshErrorView = () => {
        let message = '_';
        if (this.isChartRefreshFailed()) message = '!';
        else if (this.isChartRefreshing()) message = 'O';
        return (
            <Col>
                <div>{message}</div>
            </Col>
        )
    };

    getChartLoadingView = () => {
        if (!this.isDataAvailable()) {
            return (
                <div>
                    {this.getChartLoadingSpinnerView()}
                    {this.getChartLoadErrorView()}
                </div>
            )
        }
    };

    getChartHeaderView = () => {
        return (
            <div>
                <Row between="xs">
                    {this.getCurrencyNameView()}
                    {this.getCurrentPriceView()}
                    {this.getChartRefreshingOrRefreshErrorView()}
                    {this.getPollingIntervalDropdownView()}
                    {this.getCloseButtonView()}
                </Row>
            </div>
        )
    };

    getChartBodyView = () => {
        return (
            <div>
                <div>
                    {this.getPriceDataPlotView()}
                </div>
            </div>
        )
    };

    getChartLoadedView = () => {
        if (this.isDataAvailable()) {
            return (
                <div>
                    {this.getChartHeaderView()}
                    {this.getChartBodyView()}
                </div>
            )
        }
    };

    getChartView = () => {
        return (
            <div>
                {this.getChartLoadingView()}
                {this.getChartLoadedView()}
            </div>
        )
    };

    render() {
        return (
            <div style={{margin: '10px'}}>
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
