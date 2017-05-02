import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';

import ChartAdderView from '../ChartAdder';
import ChartsContainerView from '../ChartsContainer';

import * as currenciesActions from '../../actions/currencies';
import * as chartActions from '../../actions/charts'

import { getInitialChartConfig } from '../../utils/chartConfig'

class HomeView extends React.Component {

    static propTypes = {
        currencies: PropTypes.object,
        fetchCurrencyPairs: PropTypes.func,
        addChart: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            isChartConfigFetched: false,
            isChartConfigFetchError: false
        }
    }

    componentWillMount() {
        if (!this.isCurrencyPairsFetched()) {
            this.startFetchingCurrencyPairs()
        }
        if (!this.isChartConfigFetched()) {
            this.startFetchingChartConfig()
        }
    }

    isCurrencyPairsFetched = () => {
        return this.props.currencies.isCurrencyPairsLoaded
    };

    isCurrencyPairsFetchError = () => {
        return this.props.currencies.isCurrencyPairsLoadError
    };

    isChartConfigFetched = () => {
        return this.state.isChartConfigFetched
    };

    isChartConfigFetchError = () => {
        return this.state.isChartConfigFetchError
    };

    startFetchingCurrencyPairs = () => {
        this.props.fetchCurrencyPairs((err) => {
            if (err !== undefined) {
                setTimeout(this.startFetchingCurrencyPairs, 1000)
            }
        })
    };

    startFetchingChartConfig = () => {
        getInitialChartConfig()
            .then((chartConfig) => {
                this.addCharts(chartConfig);
                this.setState({isChartConfigFetched: true, isChartConfigFetchError: false})
            })
            .catch((err) => {
                console.error(err);
                this.setState({isChartConfigFetchError: true});
                setTimeout(this.startFetchingCurrencyPairs, 1000)
            })
    };

    addCharts = (chartConfig) => {
        for (const config of chartConfig) {
            console.log(config);
            this.props.addChart(config.currencyPair, config.pollingInterval, false);
        }
    };

    getCurrencyPairsChartsLoadErrorView = () => {
        if (this.isCurrencyPairsFetchError() || this.isChartConfigFetchError()) {
            return (
                <Row center="xs">
                    <div>(!) There might be a problem with your internet connection.</div>
                </Row>
            )
        }
    };

    getCurrencyPairsChartsLoadingSpinner = () => {
        return <div>O</div>
    };

    getCurrencyPairsChartsLoadingMessage = () => {
        return <div>Loading currency pairs and charts...</div>
    };

    getCurrencyPairsLoadingSpinnerAndMessage = () => {
        return (
            <div>
                <Row center="xs">
                    {this.getCurrencyPairsChartsLoadingSpinner()}
                </Row>
                <Row center="xs">
                    {this.getCurrencyPairsChartsLoadingMessage()}
                </Row>
            </div>
        )
    };

    getCurrencyPairsLoadingView = () => {
        if (!this.isCurrencyPairsFetched() || !this.isChartConfigFetched()) {
            return (
                <div>
                    {this.getCurrencyPairsLoadingSpinnerAndMessage()}
                    {this.getCurrencyPairsChartsLoadErrorView()}
                </div>
            )
        }
    };

    getChartAdderAndChartsContainerView = () => {
        if (this.isCurrencyPairsFetched() && this.isChartConfigFetched()) {
            return (
                <div>
                    <Row center="xs">
                        <ChartAdderView/>
                    </Row>
                    <hr />
                    <Row>
                        <ChartsContainerView/>
                    </Row>
                </div>
            )
        }
    };

    getHomeGridView = () => {
        return (
            <div>
                <Grid fluid>
                    {this.getCurrencyPairsLoadingView()}
                    {this.getChartAdderAndChartsContainerView()}
                </Grid>
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.getHomeGridView()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...currenciesActions, ...chartActions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
