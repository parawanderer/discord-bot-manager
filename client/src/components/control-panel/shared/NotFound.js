import React from 'react';

class NotFound extends React.Component { 

    render() {
        return (
            <div id="not-found">
                <div className="not-found-top">
                    <div className="not-found-icon">
                        <i className="fal fa-frown"></i>
                    </div>
                    <div className="not-found-title">
                        Oops!
                    </div>
                </div>
                <div className="not-found-body">
                    The resource requested could not be found!
                </div>
            </div>
        );
    }
}

export default NotFound;