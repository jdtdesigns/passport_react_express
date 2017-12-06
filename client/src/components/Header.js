import React from 'react';

const Header = props => (
    <header className="row split y-center">
        <h3>Logo</h3>
        <nav className="row">
            {props.logged_in ? (
                <a href="/profile">{props.email}</a>
            ) : ( <a href="/login">Login</a> )}
        </nav>
    </header>
)

export default Header;