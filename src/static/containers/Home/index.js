import React from 'react';
import { connect } from 'react-redux';

import ChartAdderView from '../ChartAdder';
import ChartsContainerView from '../ChartsContainer';

import './style.scss';

class HomeView extends React.Component {

    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <div className="container">
                <div className="margin-top-medium text-center">
                </div>
                <div className="text-center">
                    <ChartAdderView/>
                    <ChartsContainerView/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
