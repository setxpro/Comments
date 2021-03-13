import React, { Component } from 'react';
import './App.css';

import Comentario from './components/Comentario'

class App extends Component {

  state = {
    comentarios: [
      {
        nome: 'joaoo',
        email: 'joao@mail.com',
        data: new Date(2020, 3, 19, 17, 30, 0),
        mensagem: 'Olá, Tudo bem ?'
      },
      {
        nome: 'Maria',
        email: 'maria@mail.com',
        data: new Date(2020, 3, 22, 12, 15,0),
        mensagem: 'Olá, Tudo sim e com vc?'
      }
    ],
    novoComentario: {
      nome: '',
      email: '',
      mensagem: ''
    }
  }
  
  adcionarComentario = event => {
    event.preventDefault();

    const novoComentario = {...this.state.novoComentario, data: new Date()} //adc campo novo com data
    this.setState({
      comentarios: [ ...this.state.comentarios, novoComentario],
      novoComentario: {nome: '', email: '', mensagem: ''}
    }) 
    //this.setState() é usado para mudar o status
  }

  removerComentario = comentario => {
    let lista = this.state.comentarios;
    lista = lista.filter(c => c !== comentario)
    this.setState({ comentarios: lista })
  }

  digitacao = event => {
    const { name, value } = event.target;
    this.setState({ novoComentario: {...this.state.novoComentario, [name]: value} })
  }

  render(){
    return (
      <div className="App">
        <h1>Comentarios</h1>
      {this.state.comentarios.map((comentario,indice) => (
        <Comentario 
              key={indice}
            nome={comentario.nome} 
            email={comentario.email} 
            data={comentario.data} 
            onRemove={this.removerComentario.bind(this, comentario)}>
            {comentario.mensagem}
        </Comentario>
      ))} 

        <form method="post" onSubmit={this.adcionarComentario} className="Novo-Comentario" >
        <h2>Adicionar Comentarios</h2>
        <div>
          <input 
          type="text" 
          name="nome" 
          required
          value={this.state.novoComentario.nome}
          onChange={this.digitacao}
          placeholder="digite seu nome"/>
        </div>
        <div>
          <input 
          type="email" 
          name="email"
          required
          value={this.state.novoComentario.email}
          onChange={this.digitacao}
          placeholder="digite seu email"/>
        </div>
        <div>
          <textarea 
          name="mensagem"
          required
          value={this.state.novoComentario.mensagem}
          onChange={this.digitacao}
          rows="4"/>
          
        </div>
        <button type="submit">Adicionar Comentario</button>
        </form>
      </div>
    );
  }
}

export default App;
