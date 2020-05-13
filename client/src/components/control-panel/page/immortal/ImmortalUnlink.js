import React from 'react';

import DeletePopup from '../../generic/DeletePopup';

class ImmortalUnlink extends React.Component {

    getUserInfo = () => {

        if (this.props.immortal.member) {
            return (
                <div className="delete-immortal-info">
                    <span className="delete-immortal-name">{this.props.immortal.member.username}</span>
                    <span className="delete-immortal-discriminator">#{this.props.immortal.member.discriminator}</span>
                    {!this.props.immortal.member.nickname ? '' : 
                        <span className="delete-immortal-nick">
                            ({this.props.immortal.member.nickname})
                        </span>
                    }
                </div>
            );
        }
        return (
            <div className="delete-immortal-info">
                <span className="delete-immortal-id">{this.props.immortal.discord_id}</span>
            </div>
        );
    };

    render() {
        if (!this.props.immortal || !this.props.show) return null;


        return (
            <DeletePopup
                onCancel={this.props.onCancel}
                onConfirm={this.props.onDeleteConfirm}
                title={"Unlink Immortal"}
                componentName={"immortal"}
                removeText={"Unlink Immortal"}
            >
                Are you sure you want to unlink this user?
                {this.getUserInfo()}
                <div className="info">
                    Note: Unlinking an user does not remove them from this list, but marks them as inactive. 
                    <br/>It does however remove their linked account discord ID internally on the Mineplex website.
                </div>
            </DeletePopup>
        );
    }
}

export default ImmortalUnlink;