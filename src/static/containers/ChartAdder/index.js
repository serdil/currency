import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

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

    onDropdownChange = (event, index, value) => {
        this.setState({selectedCurrency: value});
    };

    onAddChartButtonClick = () => {
        this.props.addChart(this.state.selectedCurrency);
    };

    getDropdownMenuItems = () => {
        return this.getCurrencyOptions()
            .map(currency => <MenuItem key={currency} value={currency} primaryText={currency} />)
    };

    getDropdownView = () => {
        return (
            <div style={{display: 'inline', margin: '5px'}}>
                <DropDownMenu value={this.state.selectedCurrency} onChange={this.onDropdownChange}>
                    {this.getDropdownMenuItems()}
                </DropDownMenu>
            </div>
        )
    };

    getAddChartButtonView = () => {
        return (
            <div style={{display: 'inline', margin: '5px'}}>
                <FloatingActionButton mini={true} onTouchTap={this.onAddChartButtonClick}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    };

    getLabelView = () => {
        return (
            <div style={{display: 'inline', margin: '5px'}}>
                Add a new Chart:
            </div>
        )
    };

    render() {
        return (
            <Row middle="xs" center="xs">
                <Col>
                    {this.getLabelView()}
                </Col>
                <Col>
                    {this.getDropdownView()}
                </Col>
                <Col>
                    {this.getAddChartButtonView()}
                </Col>
            </Row>
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
