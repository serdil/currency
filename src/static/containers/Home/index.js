import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
                    <h1>Django React Redux Demo</h1>
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
