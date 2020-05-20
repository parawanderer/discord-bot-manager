import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import NavLogo from './NavLogo';
import PageTop from './PageTop';

import Home from '../page/Home';
import Admins from '../page/admins/Admins';
import Configuration from '../page/config/Configuration';
import Immortal from '../page/immortal/Immortal';
import Punishments from '../page/punishments/Punishments';
import PunishmentSystem from '../page/severity/PunishmentSystem';
import Rules from '../page/rules/Rules';
import ReactionRoleSystem from '../page/react-role/ReactionRoleSystem';
import Filter from '../page/filter/Filter';
import Reports from '../page/reports/Reports';
import PunishmentDetail from '../page/punishments/PunishmentDetail';
import NotFound from './NotFound';


class ControlPanelContainer extends React.Component {

    render() {
        return(
            <div className="control-panel-container">
                <BrowserRouter>
                <div className="sidebar">
                    <NavLogo />
                    <Nav />
                </div>
                <div className="main-container" id="main-container">
                    <PageTop />
                    <div className="page-content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/admins" component={Admins} />
                            <Route exact path="/config" component={Configuration} />
                            <Route exact path="/reports" component={Reports} />
                            <Route exact path="/immortal" component={Immortal} />
                            <Route exact path="/punishments" component={Punishments} />
                            <Route exact path="/Rules" component={Rules} />
                            <Route exact path="/severities" component={PunishmentSystem} />
                            <Route exact path="/react-role" component={ReactionRoleSystem} />
                            <Route exact path="/filter" component={Filter} />
                            <Route path="/punishments/punishment/:id" component={PunishmentDetail} />
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default ControlPanelContainer;