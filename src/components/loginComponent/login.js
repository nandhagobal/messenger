import axios from 'axios'
import React from 'react'
import { Component } from 'react'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import style from './login.module.css'

class Login extends Component{
    state={
        username:'',
        password:'',

    }
    usernameHandler=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    passwordHandler=(e)=>{
        this.setState({
            password:e.target.value
        })
    }

    loginHandler=()=>{
        axios({
            url:'http://localhost:8080/login',
            method:'post',
            headers:{'Content-Type':'application/json'},
            data:{username:this.state.username,password:this.state.password}
        }).then(res=>{
            if(res.status==403){
                console.log('wrong user');
            }
            else{
                this.props.tokenHandler(res.data);
                console.log(this.props.token);
                this.props.history.push('/chat');
            }
        })
    }
    render(){
        return(
            <div className={style.outer}>
                <p>Log IN</p>
                Username:<input type="text" value={this.state.username} onChange={this.usernameHandler}></input>
                Password:<input type="password" value={this.state.password} onChange={this.passwordHandler}></input>
                <button onClick={this.loginHandler}>Log in</button>
            </div>
        )
    }
}

export default withRouter(Login);