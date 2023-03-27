import React from 'react';
import '../../styles/components/layout/header.css';

const Header = (props) => {
    return(
        <header>
            <div>
                <img src="img/logo.png" width="100" alt="Transportes X" />
                <h1>Transportes X</h1>
            </div>
        </header>
    );
}

export default Header;