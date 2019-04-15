import React, { Component } from 'react';
import './App.css';

import Routes from './routes';

class App extends Component {
  render() {
    return <Routes/>;
  }
}
//parar trabalhar com a chamada das APIS trabalhar com uma plugin chamado axios
//yarn add axios
//para trabalhar com navegação das rotas usa o react-router-dom
//yarn add react-router-dom
//para trabalhar com icones usa o react-icons
//yarn add react-icons
//lib para data
//yarn add date-fns
//para fz fileupload
//yarn add react-dropzone
//resolvendo arquivos em tempo real socket
//yarn add socket.io-client
export default App;
