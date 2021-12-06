import React, { Component } from 'react';
// import logo from './logo.svg';
import style from './App.module.css';

import Outline from './components/chatComponent/outline/outline';
import Heading from './components/headingComponent/heading';
import { Route, Switch,Redirect } from 'react-router-dom';
import Backdrop from './GUI/backdrop/backdrop';
import ChatArea from './components/chatComponent/chatarea/chatArea';
import Header from './components/chatComponent/headerComponent/header';
import Siginin from './components/sigininComponent/signin';
import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/loginComponent/login';
// import axios from 'axios'

class App extends Component {
  state={
    auth:false,
    chat:false,
    show:false,
    login:false,
    token:''
  }

  tokenHandler=(token)=>{
    this.setState({
      token:token
    })
  }
  // content=null;
  // startContent=(<);
  chatHandler=()=>{
    console.log('chatHandler')
    this.setState((prev)=>{
      return{
      chat:!prev.chat
    }})
  }

  showHandler=()=>{
    this.setState({show:true});
  }

  authHandler=()=>{
    this.setState({
      auth:true
    })
  }

  render(){
  return (
    <div className={style.app}>
      
      {/* {this.state.chat?this.content:this.startContent} */}
      {this.state.chat?null:<Heading/>}
    <Switch>    
                {/* <Redirect from='/' to='/chat'/> */}
                <Route path='/login' render={()=>{
                  return (<Backdrop show={true}><Login token={this.state.token} tokenHandler={this.tokenHandler}></Login></Backdrop>)
                }}></Route>
                <Route path='/check' render={()=><div></div>}/>
                <Route path='/chat/:name' render={()=>{
                  return(<React.Fragment>
                    <Header chatHandler={this.chatHandler}></Header>
                    <ChatArea token={this.state.token}></ChatArea>
                  </React.Fragment>)
                }}></Route>
                <Route path='/signin' render={()=>{
                  
                  return <Backdrop show={true}><Siginin></Siginin></Backdrop>
                }}></Route>
                <Route path='/chat' render={()=>{
                   return <Outline token={this.state.token} chatHandler={this.chatHandler}></Outline>
                }}>
                    </Route>
                <Route path='/status' render={()=>{
                   return <Outline chat={[]}>Status Area</Outline>
                }}></Route>
                <Route path='/contact' render={()=>{
                   return <Outline chat={[]}>Contact Area</Outline>
                }}></Route>
                {/* <Route path='/chatArea' render={()=><ChatArea></ChatArea>}></Route> */}
                <Route path='/' render={()=>{
                   return <p>welcome to whatsapp duplicate<br></br><center><strong>click chat tab</strong></center>
                   </p>
                }}></Route>
                
      </Switch>
      
      {!this.state.auth && !this.state.show ?<Backdrop show={true}>
      <Link to='/login'> <button onClick={this.showHandler}>logIn</button></Link>
      {/* <button onClick={this.authHandler}>Login</button><br></br> */}
      <Link to='/signin'> <button onClick={this.showHandler}>signIn</button></Link>
      </Backdrop>:null}
    </div>
  );
  }
}

export default withRouter(App);
