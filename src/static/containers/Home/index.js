import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';

import ChartAdderView from '../ChartAdder';
import ChartsContainerView from '../ChartsContainer';

import GridTest from '../../components/GridTest'

import * as currenciesActions from '../../actions/currencies';

import './style.scss';

class HomeView extends React.Component {

    static propTypes = {
        currencies: PropTypes.object
    };

    componentWillMount() {
        if (!this.isCurrencyPairsFetched()) {
            this.startFetchingCurrencyPairs()
        }
    }

    isCurrencyPairsFetched = () => {
        return this.props.currencies.isCurrencyPairsLoaded
    };

    isCurrencyPairsFetchError = () => {
        return this.props.currencies.isCurrencyPairsLoadError
    };

    startFetchingCurrencyPairs = () => {
        this.props.fetchCurrencyPairs((err) => {
            if (err !== undefined) {
                setTimeout(this.startFetchingCurrencyPairs, 1000)
            }
        })
    };

    getCurrencyPairsLoadErrorView = () => {
        if (this.isCurrencyPairsFetchError()) {
            return (
                <Row center="xs">
                    <div>(!) There might be a problem with your internet connection.</div>
                </Row>
            )
        }
    };

    getCurrencyPairsLoadingSpinner = () => {
        return <div>O</div>
    };

    getCurrencyPairsLoadingMessage = () => {
        return <div>Loading currency pairs...</div>
    };

    getCurrencyPairsLoadingSpinnerAndMessage = () => {
        return (
            <div>
                <Row center="xs">
                    {this.getCurrencyPairsLoadingSpinner()}
                </Row>
                <Row center="xs">
                    {this.getCurrencyPairsLoadingMessage()}
                </Row>
            </div>
        )
    };

    getCurrencyPairsLoadingView = () => {
        if (!this.isCurrencyPairsFetched()) {
            return (
                <div>
                    {this.getCurrencyPairsLoadingSpinnerAndMessage()}
                    {this.getCurrencyPairsLoadErrorView()}
                </div>
            )
        }
    };

    getChartAdderAndChartsContainerView = () => {
        if (this.isCurrencyPairsFetched()) {
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
                <GridTest/>
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
    return bindActionCreators(currenciesActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
