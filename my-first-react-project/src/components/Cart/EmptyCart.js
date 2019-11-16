import React from 'react';

function EmptyCart() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-10 max-auto text-center text-title">
                    <h1>Your Cart is currently empty!</h1>
                </div>
            </div>       
        </div>
    );
}

export default EmptyCart;