import React from 'react';

const Header = (props) => {
    return (
        <div className="container">
            <h3 className="float-left">{props.head}</h3>
            <span className = "clearfix" />
        </div>
    );
};

export default Header;