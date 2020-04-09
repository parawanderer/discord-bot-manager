import React from 'react';

import PunishmentSeverityHelper from '../../../../utils/PunishmentSeverityHelper';

import DeletePopup from '../../generic/DeletePopup';

class SeverityDelete extends React.Component {


    getTypeIcon() {
        const {type_raw} = this.props.sev;
        return PunishmentSeverityHelper.getIcon(type_raw);
    }

    getSeverity() {
        const {severity} = this.props.sev;
        return PunishmentSeverityHelper.getSeverityBlock(severity);
    }

    getTypeText() {
        const {type_raw} = this.props.sev;
        return PunishmentSeverityHelper.getTextType(type_raw);
    }

    getTypeInfo = () => {
        return (
            <div className="sev-delete-item">
                {this.getTypeIcon()} {this.getSeverity()} {this.getTypeText()}
            </div>
        );
    };

    render() {

        //this.props.onDeleteConfirm
        //this.props.onCancel

        if (!this.props.sev || !this.props.show) return null;


        return (
            <DeletePopup
                onCancel={this.props.onCancel}
                onConfirm={this.props.onDeleteConfirm}
                title={"Delete Punishment Type"}
                componentName={"sev"}
                removeText={"Remove"}
            >
                Are you sure you want to delete this punishment type?
                {this.getTypeInfo()}
            </DeletePopup>
        );
    }
}

export default SeverityDelete;