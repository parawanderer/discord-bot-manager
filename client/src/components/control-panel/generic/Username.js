import React from 'react';

const Username = (props) => {

    const {username, discriminator} = props;

    return (
        <div className="username">
            {username}
            <span className="discriminator-split">#</span>
            <span className="discriminator">{discriminator !== null ? discriminator : "????"}</span>
        </div>
    );
}

export default Username;