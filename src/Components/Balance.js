import React from 'react';

const Balance = (props) => {
    return (
        <div className="container mb-2">
            <div className="row text-left">
                <ul className="list-group col-4">
                    <li className="list-group-item bg-success">Credit</li>
                    <li className="list-group-item">$ {props.credit}</li>
                </ul>
                <ul className="list-group col-4">
                    <li className="list-group-item bg-danger">Debit</li>
                    <li className="list-group-item">$ {props.debit}</li>
                </ul>
                <ul className="list-group col-4">
                    <li className="list-group-item bg-primary">Balance</li>
                    <li className="list-group-item">$ {props.credit + props.debit}</li>
                </ul>
            </div>
        </div>
    );
};

export default Balance;