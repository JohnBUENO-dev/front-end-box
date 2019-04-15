import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//importando rotas
import Main from './pages/main';
import Box from './pages/box';
//exact precisa para fixar a entrada principal da pagina
const Routes = () => (
  <BrowserRouter>
    <Switch>
     <Route path="/" exact component={Main} />
     <Route path="/box/:id" component={Box} />
   </Switch>
  </BrowserRouter>
);

export default Routes;