import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default class Main extends Component {
  //objeto state vai armazenar dentro do estado se algo mudar
  state = {
    newBox: '',

  };

  handleSubmit = async e => {
   e.preventDefault();   
   //console.log(this.state.newBox);
   const response = await api.post('/boxes',{
     title: this.state.newBox,

   });    
   //valor do id da boxes cadastrada esta no retorno da data
   this.props.history.push(`/box/${response.data._id}`);
   //testar retorno dos valores gerados
   console.log(response.data);
  };
  handleInputChange = (e) => {
   //para acessar as mudanças no html usa o setState
   this.setState({newBox: e.target.value});
  };

  render() {
      //src={logo} informa que o codigo que será adicionado
      //vai ser uma variavel javascript , a imagem é passada como uma variavel
    return(
      <div id="main-container">
       <form onSubmit={this.handleSubmit}>
 
        <img src={logo} alt="" />
        <input
          placeholder="Criar um Box" 
          value = {this.state.newBox}
          onChange = {this.handleInputChange}
        /> 
        <button type="submit">Criar</button>
       </form>
      </div>

    );
  }
}

