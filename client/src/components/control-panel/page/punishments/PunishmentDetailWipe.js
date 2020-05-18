import React from 'react';
import DeletePopup from '../../generic/DeletePopup';


class PunishmentDetailWipe extends React.Component {

    render() {
        // onCancel
        // onDeleteConfirm
        // punishment
        const {onCancel, onDeleteConfirm, punishment, show} = this.props;

        if (!show || !punishment) {
            return null;
        } else {
            return (
                <DeletePopup
                    onCancel={onCancel}
                    onConfirm={onDeleteConfirm}
                    title={"Wipe Punishment"}
                    componentName={"wipe-punishment"}
                    removeText={"Wipe"}
                >
                    Are you sure you want to wipe Punishment #{punishment.id}?
                    <br/>
                    The punishment "wiper" will be shown as "System" if this is done.
                </DeletePopup>
            );
        }
    }
}

export default PunishmentDetailWipe;