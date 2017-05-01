import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Row, Col } from 'react-flexbox-grid';

import * as chartActions from '../../actions/charts';


class ChartAdderView extends React.Component {

    static propTypes = {
        addChart: PropTypes.func,
        currencies: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedCurrency: props.currencies.currencyPairs[0]
        };
    }

    getCurrencyOptions = () => {
        return this.props.currencies.currencyPairs;
    };

    onDropdownChange = (evt) => {
        this.setState({selectedCurrency: evt.target.value});
    };

    onAddChartButtonClick = () => {
        this.props.addChart(this.state.selectedCurrency);
    };

    getDropdownOptionViews = () => {
        return this.getCurrencyOptions().map(currency => <option key={currency} value={currency}>{currency}</option>)
    };

    getDropdownView = () => {
        return (
            <div style={{display: 'inline', marginRight: '5px'}}>
                <select defaultValue={'EUR-TRY'} onChange={this.onDropdownChange}>
                    {this.getDropdownOptionViews()}
                </select>
            </div>
        )
    };

    getAddChartButtonView = () => {
        return (
            <div style={{display: 'inline', marginLeft: '5px'}}>
                <button onClick={this.onAddChartButtonClick}>Add Chart</button>
            </div>
        )
    };

    render() {
        return (
            <Col xs={12}>
                <div>
                    {this.getDropdownView()}
                    {this.getAddChartButtonView()}
                </div>
            </Col>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currencies: state.currencies
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(chartActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartAdderView);
export { ChartAdderView as ChartAdderViewNotConnected };
