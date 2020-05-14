import React from 'react';
import ImmortalListItem from './ImmortalListItem';

class ImmortalList extends React.Component {

    onDeleteItemCallback = (userID) => {
        this.props.deleteCallback(userID);
    }

    onHoverItemCallback = (userID) => {
        this.props.hoverCallback(userID);
    }


    render() {

        //this.props.hoverCallback
        //this.props.deleteCallback
        //this.props.immortals

        const { immortals } = this.props;

        const immortalList = immortals.map(immortal => 
            <ImmortalListItem 
                key={immortal.id} 
                userID={immortal.discord_id} 
                minecraftUUID={immortal.minecraft_uuid}
                websiteID={immortal.website_id}
                onDeleteButtonpressCallback={this.onDeleteItemCallback} 
                mouseEnterCallback={this.onHoverItemCallback}
                minecraftInfo={immortal.minecraft_info}
                active={immortal.active}
            />
            );        

        return (
            <div className="immortal-list">
                <h3 className="block-title">Immortals
                    <span className="list-count">
                        {immortals.length}
                    </span>
                </h3>
                <div className="immortal-list-body">
                    <table>
                        <tbody>
                        <tr>
                            <th>
                                Linking State
                            </th>
                            <th>
                                Minecraft Info
                            </th>
                            <th>
                                Discord ID
                            </th>
                            <th>
                                Website ID
                            </th>
                            <th>

                            </th>
                        </tr>
                        {immortalList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ImmortalList;