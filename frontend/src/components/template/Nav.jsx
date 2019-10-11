import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar em casa! */}
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/users">
                <i className="fa fa-users"></i> Usuários
            </Link>
            <Link to="/produtos">
                <i className="fa fa-shopping-cart"></i> Produtos
            </Link>
            <Link to="/compras">
                <i className="fa fa-shopping-basket"></i> Compras
            </Link>
        </nav>
    </aside>