import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        return <Chart chart={chart} key={chart.id}/>
    };

    render() {
        return (
            <div className="container">
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
