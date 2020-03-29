import React from 'react';


const AdminListItem = (props) => {

    const admin = props.admin;
    const self = props.self;
    const mouseEnterCallback = props.mouseEnterCallback;
    const onDeleteButtonpressCallback = props.onDeleteButtonpressCallback;

    const getAdminUsername = (admin) => {
        if (!admin.member) return null;

        if (admin.member.nickname) {
            return (
                <div className="admin-name">
                {admin.member.username}
                <span className="admin-discrim-div">#</span>
                <span className="admin-discrim">{admin.member.discriminator}</span>
                <div className="admin-nick">({admin.member.nickname})</div>
            </div>
            );
        }
        return (
            <div className="admin-name">
                {admin.member.username}
                <span className="admin-discrim-div">#</span>
                <span className="admin-discrim">{admin.member.discriminator}</span>
            </div>
        );
    };

    const getAdminAvatar = (admin) => {
        if (!admin.member) return null;
        return (
            <div className="admin-avatar">
                <img src={admin.member.effective_avatar} alt={admin.userId} />
            </div>
        );
    };

    
    const adminType = (admin.superAdmin) ? <div className="admin-type"><i className="fad fa-crown"></i> Super Admin</div> : <div className="admin-type">Admin</div> ;
        
    let prefix = null;
    if (admin.userId === self.adminUID) {
        prefix = <div className="admin-you">YOU</div>;
    }

    const adminID = <div className="admin-id">{admin.userId}</div>;

    const adminAvatar = getAdminAvatar(admin);
    const adminUsername = getAdminUsername(admin);

    return (
        <div className="admin" onMouseEnter={() => mouseEnterCallback(admin)}>
            <button className="admin-delete" disabled={admin.superAdmin} onClick={onDeleteButtonpressCallback}><i className="fas fa-trash-alt"></i></button>
            <div className="admin-info">
                {adminAvatar}
                <div className="admin-text">
                    <div className="admin-name-info">{prefix} {adminUsername} {adminID}</div>
                    <div className="admin-type-info">{adminType}</div>
                </div>
            </div>
        </div>
    );
};


export default AdminListItem;