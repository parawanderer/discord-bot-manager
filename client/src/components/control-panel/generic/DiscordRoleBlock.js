import React from 'react';
import DiscordRole from './DiscordRole';

class DiscordRoleBlock extends React.Component {

    render() {

        //this.props.memberRoles (array, possibly empty)

        const {memberRoles} = this.props;

        if (!memberRoles) return null; // no roles to render

        const roles = memberRoles.map( role => <DiscordRole key={role.id} role={role}/> );

        return (
            <div className="rolelist">
                {roles}
            </div>
        );
    }
}

export default DiscordRoleBlock;