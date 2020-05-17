import React from 'react';
import PunishmentList from './PunishmentsList';
import PunishmentItem from './PunishmentItem';

class Punishments extends React.Component {
    render() {
        return (
            <div>
                <PunishmentList/>
                {/* <PunishmentItem/> */}
            </div>
        );
    }
}

export default Punishments;