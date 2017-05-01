import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-flexbox-grid';

import Chart from '../Chart';

import * as chartActions from '../../actions/charts';


class ChartsContainerView extends React.Component {

    static propTypes = {
        charts: PropTypes.object
    };

    getChartsView = () => {
        return this.props.charts.charts.map(this.getChartView)
    };

    getChartView = (chart) => {
        return (
            <Col key={chart.id} xs={12} sm={6} lg={4}>
                <Chart chart={chart}/>
            </Col>
        )
    };

    render() {
        return (
            <div>
                {this.getChartsView()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        charts: state.charts
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(chartActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsContainerView);
export { ChartsContainerView as ChartAdderViewNotConnected };
