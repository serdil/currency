import React from 'react';
import PropTypes from 'prop-types';


import {Line} from 'react-chartjs-2';

export default class PricePlotView extends React.Component {

    static propTypes = {
        priceData: PropTypes.array
    };

    getPriceData = () => {
        return this.props.priceData
    };

    getLabels = () => {
        return new Array(this.getPriceData().length).fill('')
    };

    getChartjsData = () => {
        return {
            labels: this.getLabels(),
            datasets: [
                {
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.getPriceData()
                }
            ]
        };
    };

    getChartjsOptions = () => {
        return {
            legend: {
                display: false
            }
        }
    };

    getChartjsChart = () => {
        return (
            <Line data={this.getChartjsData()}
                  options={this.getChartjsOptions()}/>
        )
    };

    getPlotView = () => {
        return (
            <div>
                {this.getChartjsChart()}
            </div>
        )
    };

    render() {
        return (
            <div>
                {this.getPlotView()}
            </div>
        );
    }
}