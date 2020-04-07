import React from 'react';

class DiscordRole extends React.Component {

    render() {

        //this.props.role (role object)

        const {id, name, color, position, mentionable} = this.props.role;

        return (
            <div className="discord-role" id={`role-${id}`} style={{borderColor: color}} >
                <span className="discord-role-decorator" style={{backgroundColor: color}} />
                <div className="discord-role-title">
                    {name}
                </div>
            </div>
        );

    }
}

export default DiscordRole;