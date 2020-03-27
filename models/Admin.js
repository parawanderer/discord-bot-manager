class Admin {

    /**
     * 
     * @param {Object} param0   Expects return data objecr from /admin bot api endpoint
     */
    constructor({user_id, super_admin, added_by, added_by_name, added_timestamp}) {
        this.userId = user_id;
        this.superAdmin = super_admin;
        this.addedBy = added_by;
        this.addedByName = added_by_name;
        this.addedTimestamp = added_timestamp;
    }

    isSuperAdmin() {
        return !!this.superAdmin;
    }

    static checkValidAdmin(object) {
        return object.user_id && (object.super_admin === true || object.super_admin === false) && 
            (object.added_by || object.added_by === null) 
            && (object.added_by_name || object.added_by_name === null)
            && (object.added_timestamp || object.added_timestamp === null);
    }
}

module.exports = Admin;