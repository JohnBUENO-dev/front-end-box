import React, { Component } from 'react';
//icones do react
import { MdInsertDriveFile } from 'react-icons/md';

import logo from "../../assets/logo.svg";
import api from '../../services/api';

//date para filtrar e calcular a ahora
import {distanceInWords} from "date-fns";
import pt from "date-fns/locale/pt";
//para fazer upload file
import Dropzone from "react-dropzone";
//socket para cliente
import socket from "socket.io-client";

import './styles.css';

export default class Box extends Component {
  //objeto começa vazio
  state = { box: {}}

  async componentDidMount(){
   this.subscribeParaNovoFiles();
   //id é o nome do valor declarado na rota que está sendo passado na params id 
   //recebe o id atraves da rota
   const box = this.props.match.params.id; 
   //chamada da api para o banco de dados
   const response = await api.get(`boxes/${box}`)
   //após receber dados ele é populado com os dados oriundos do banco atraves do response que atualiza 
   //o estado do objeto dentro da aplicação
   this.setState({box: response.data}); 
  } 

  subscribeParaNovoFiles = () =>{
    const box = this.props.match.params.id;
    const io = socket("https://box-teste-1.herokuapp.com/");

    io.emit("connectRoom", box);
    io.on("file", data => {
      this.setState({box: { ...this.state.box, files: [data,... this.state.box.files] }});
    });
  };

  handleUpload = files => {
    files.forEach( file => {
      // console.log(file);
      const data = new FormData();
      const box_id = this.props.match.params.id;
      
      data.append("file",file);

      api.post(`boxes/${box_id}/files`,data);
    });
  };

  //linha 37 verifica primeiro se tem dados se tiver dados ela executa o map no array de dados
  render(){ return(
     <div id="box-container">
       <header>
         <h1>Diretorio: {this.state.box.title}</h1>
       </header>
       
       <Dropzone onDropAccepted={this.handleUpload}>
        {({getRootProps, getInputProps}) =>(
        <div className="upload" {...getRootProps()}>
         <input {...getInputProps()} />
         <p>Arraste arquivos ou clique aqui</p>
        </div> 
        )}
       </Dropzone>  


       <ul>
          
         { this.state.box.files && this.state.box.files.map(
            file => (
         <li key={file._id}>
           <a className="fileInfo" href={file.url} target="_blank">
              <MdInsertDriveFile size={24} color="#A5Cfff"/>
              <strong>{file.title}</strong>
           </a>  
        
           <span>
           há{" "}
           {distanceInWords(file.createdAt, new Date(), {
             locale: pt
           })}
           </span>
           
         </li>

          ))}
        </ul>  
     </div>
   )};
  }

//<span>{file.createdAt}</span>