import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import ChartAdderView from '../ChartAdder';
import ChartsContainerView from '../ChartsContainer';

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
            return <div>(!) There might be a problem with your internet connection.</div>
        }
    };

    getCurrencyPairsLoadingView = () => {
        if (!this.isCurrencyPairsFetched()) return <div>Loading currency pairs...</div>
    };

    getChartAdderView = () => {
        return <ChartAdderView/>
    };

    getChartsContainerView = () => {
        return <ChartsContainerView/>
    };

    getChartAdderAndChartsContainerView = () => {
        if (this.isCurrencyPairsFetched()) {
            return (
                <div>
                    {this.getChartAdderView()}
                    <hr />
                    {this.getChartsContainerView()}
                </div>
            )
        }
    };

    render() {
        return (
            <div className="container">
                <div className="margin-top-medium text-center">
                </div>
                <div className="text-center">
                    {this.getCurrencyPairsLoadingView()}
                    {this.getCurrencyPairsLoadErrorView()}
                    {this.getChartAdderAndChartsContainerView()}
                </div>
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
