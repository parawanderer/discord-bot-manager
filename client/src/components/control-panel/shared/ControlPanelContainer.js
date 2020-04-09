import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from './Nav';
import NavLogo from './NavLogo';
import PageTop from './PageTop';

import Home from '../page/Home';
import Admins from '../page/admins/Admins';
import Configuration from '../page/config/Configuration';
import Immortal from '../page/Immortal';
import Punishments from '../page/Punishments';
import PunishmentSystem from '../page/severity/PunishmentSystem';
import Rules from '../page/rules/Rules';
import TaggableSystem from '../page/TaggableSystem';
import Filter from '../page/filter/Filter';
import Reports from '../page/reports/Reports';


class ControlPanelContainer extends React.Component {

    render() {
        return(
            <div className="control-panel-container">
                <BrowserRouter>
                <div className="sidebar">
                    <NavLogo />
                    <Nav />
                </div>
                <div className="main-container">
                    <PageTop />
                    <div className="page-content">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admins" component={Admins} />
                        <Route exact path="/config" component={Configuration} />
                        <Route exact path="/reports" component={Reports} />
                        <Route exact path="/immortal" component={Immortal} />
                        <Route exact path="/punishments" component={Punishments} />
                        <Route exact path="/Rules" component={Rules} />
                        <Route exact path="/severities" component={PunishmentSystem} />
                        <Route exact path="/taggable" component={TaggableSystem} />
                        <Route exact path="/filter" component={Filter} />
                    </div>
                </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default ControlPanelContainer;