import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';
import {Route, Redirect, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

import Search from './Search';
import NavBar from './NavBar';
import MainPage from './main/MainPage';
import PeersPage from './peers/PeersPage';
import NodesPage from './nodes/NodesPage';
import BlocksPage from './blocks/BlocksPage';
import SingleBlockPage from './blocks/SingleBlockPage';
import SingleTransactionPage from './transactions/SingleTransactionPage';
import SingleAddressPage from './addresses/SingleAddressPage';

const withNetworkRouter = (RootComponent) => {
   return class extends React.Component {
       render() {
           return (
               <Router>
                   <Switch>
                       <Route exact path="/" render={() => (<Redirect to="/mainnet" />)} />
                       <Route path="/:networkId" component={RootComponent} />
                   </Switch>
               </Router>
           );
       }
   };
}

class App extends Component {
    render() {
        const {match} = this.props;
        return (
            <React.Fragment>
                <div className="header grid">
                    <div className="header-title grid-item-fixed grid">
                        <div className="menu-toggle grid-item-fixed lg-show xlg-hide"></div>
                        <div className="logo"></div>
                    </div>
                    <Search />
                </div>
                <div className="container grid">
                     <NavBar {...this.props} />
                     <div className="content card">
                        <Switch>
                            <Route exact path={`${match.path}/blocks`} component={BlocksPage} />
                            <Route exact path={`${match.path}/blocks/:height`} component={SingleBlockPage} />
                            <Route path={`${match.path}/nodes`} component={NodesPage} />
                            <Route path={`${match.path}/peers`} component={PeersPage} />
                            <Route path={`${match.path}/general`} component={MainPage} />
                            <Route exact path={`${match.path}/tx/:transactionId`} component={SingleTransactionPage} />
                            <Route exact path={`${match.path}/address/:address`} component={SingleAddressPage} />
                            <Route exact path={`${match.path}`} render={() => (<Redirect to={`${match.url}/general`} />)} />
                        </Switch>
                     </div>
                 </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(withNetworkRouter(App));