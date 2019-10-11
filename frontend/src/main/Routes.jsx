import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import ProdutoCrud from '../components/produto/ProdutoCrud'
import CompraCrud from '../components/compra/CompraCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/produtos' component={ProdutoCrud} />
        <Route path='/compras' component={CompraCrud} />
        <Redirect from='*' to='/' />
    </Switch>