import React from 'react';

import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';


class SeverityListItem extends React.Component {
    

    getTypeIcon() {
        const {type_raw} = this.props;

        return PunishmentSeverityHelper.getIcon(type_raw);
    }

    getSeverity() {
        const {severity} = this.props;
        return PunishmentSeverityHelper.getSeverityBlock(severity);
    }

    getTextDescription() {
        const {severity} = this.props;

        if (this.props.type_raw === 1) {
            return (
                <div className="severity-text">
                    {`Severity ${severity} Mute`}
                </div>
            );
        } else if (this.props.type_raw === 2) {
            return (
                <div className="severity-text">
                    {`Severity ${severity} Ban`}
                </div>
            );

        } 
        return (
            <div className="severity-text">
                {`Warning`}
            </div>
        );
    }

    onDelete = () => {
        const {onDelete} = this.props;
        if (onDelete) {
            return onDelete;
        }
    }

    render() {
        // this.props.id
        // this.props.type_raw
        // this.props.length
        // this.props.severity
        // this.props.percentage
        // this.props.added_by
        // this.props.onHover
        // this.props.onDelete
        // this.props.onEdit

        const {onHover, onDelete, onEdit} = this.props;


        return (
            <div className="severity-list-item" onMouseEnter={onHover}>
                <button className="severity-delete" onClick={onDelete} disabled={!onDelete}><i className="fas fa-trash-alt"></i></button>
                <button className="severity-edit" onClick={onEdit}><i className="fas fa-edit"></i></button>

                {this.getSeverity()}
                <div className="severity-type">{this.getTypeIcon()}</div>
                {this.getTextDescription()}

            </div>
        );
    }
}

export default SeverityListItem;