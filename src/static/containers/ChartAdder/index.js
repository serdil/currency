import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as chartActions from '../../actions/charts';


class ChartAdderView extends React.Component {

    static propTypes = {
        addChart: PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            selectedCurrency: 'EUR-TRY'
        };
    }

    getCurrencyOptions = () => {
        return ['EUR-TRY', 'USD-TRY', 'CAD-TRY', 'NZD-TRY'];
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
            <select defaultValue={'EUR-TRY'} onChange={this.onDropdownChange}>
                {this.getDropdownOptionViews()}
            </select>
        )
    };

    getAddChartButtonView = () => {
        return <button onClick={this.onAddChartButtonClick}>Add Chart</button>
    };

    render() {
        return (
            <div className="container">
                {this.getDropdownView()}
                {this.getAddChartButtonView()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartAdderView);
export { ChartAdderView as ChartAdderViewNotConnected };
