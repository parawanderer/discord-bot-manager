const LOGIN_LIMIT = 4;
const TIME_FRAME = 1000 * 60 * 60; // 1 hr
const CLEANUP_MS = 1000 * 60 * 10; // 10 minutes
const MAX_LOGIN_CACHE = 1000; // max 1000 logins to be remembered...

class LoginLimitor {
    
    history = [];
    
    constructor() {
        setInterval(this._cleanupAllExpiredLogins, CLEANUP_MS);
    }


    // main point of interaction...
    canLogin(ip) {

        console.log(">> LoginLimitor", this.history);

        let ipHistory = this._findLoginHistoryForIP(ip);
    
        if (ipHistory) {
            this._cleanupExpiredLogins(ip);
            this._moveItemToTheStartOfArray(ipHistory); // make sure it gets moved to the start of the array

            if (ipHistory.item.logins.length >= LOGIN_LIMIT) return false; // too many recent logins
            // else add login to history now and allow it to go through
        } else {
            ipHistory = this._createLoginHistoryForIP(ip);
        }

        ipHistory.item.logins.push(new Date().getTime());
        return true;
    }


    _moveItemToTheStartOfArray = (historyItem) => {
        this.history.splice(historyItem.index);
        const newIndex = this.history.push(historyItem.item) - 1;
        historyItem.index = newIndex;
        return historyItem;
    };


    _findLoginHistoryForIP = (ip) => {
        for (let i = 0; i < this.history.length; i++) {
            let historyItem = this.history[i];
            if (historyItem.ip === ip) return {
                index: i,
                item: historyItem
            }; // return index and item for further handling.
        }
        return null;
    };

    _createLoginHistoryForIP = (ip) => {

        this._cleanupHistoryOverflowBeforeNewInsert();

        const tmpHistoryObj = {
            ip,
            logins : []
        };

        const index = this.history.push(tmpHistoryObj) - 1;

        return {
            index,
            item: tmpHistoryObj
        };
    };


    _cleanupHistoryOverflowBeforeNewInsert = () => {
        // to be called before inserting new login into history to 
        // make sure the array doesn't overflow memory

        if (this.history.length > MAX_LOGIN_CACHE) {
            this.history.pop();
        }
    };

    _cleanupExpiredLogins = (ip) => {
        const now = new Date().getTime();
        
        let h = this._findLoginHistoryForIP(ip);
        if (h === null) return; // no history for this item exists...

        for(let i = h.item.logins.length - 1; i >= 0; i--) {
            
            if ((h.item.logins[i] + TIME_FRAME) < now) 
                h.item.logins.splice(i,1); // remove elements that already expired
        }
    };


    _cleanupAllExpiredLogins = () => {
        const now = new Date().getTime();

        console.log(`>> LoginLimitor: running cleanup.... Now is ${now}`, this.history)
        // going in revere ensures we will be able to 
        // drop items as we go

        for (let i = this.history.length -1; i >= 0; i--) {
            let historyItem = this.history[i];
        

            // clean up expired logins
            for (let j = historyItem.logins.length-1; j >= 0; j--) {

                if ((historyItem.logins[j] + TIME_FRAME) < now)
                    historyItem.logins.splice(j,1); // remove elements that expired
            }   

            // finally, if there's no more existing logins, we can drop the current 
            // item from the history. If relevant, it will be added back when they try to log in again.
            if (historyItem.logins.length === 0) {
                this.history.splice(i, 1);
            }
        }
    }

}

module.exports = new LoginLimitor();