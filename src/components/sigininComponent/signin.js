import React from 'react'
import { Component } from 'react'
import style from './signin.module.css'
import axios from 'axios'
import Backdrop from '../../GUI/backdrop/backdrop'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

class Siginin extends Component{
    state={
        avail:false,
        username:'121',
        password:'',
        cpassword:'',
        match:false,
        added:false,
        error:false,
        msg:'',
        show:true
    }
    userNamecheckHandler=(e)=>{
        this.setState({username:e.target.value})
        axios.get('http://localhost:8080/check/'+e.target.value).then(res=>{
            console.log(res.data);
            this.setState({
                avail:res.data.avail
            })
        })
    }

    addUserHandler=()=>{
        if(this.state.cpassword!=this.state.password){
            return this.setState({
                match:false
            })
        }
        fetch('http://localhost:8080/add',{
            method:'post',
            body:JSON.stringify({
                username:this.state.username,
                password:this.state.password
            }),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.status===403){
            res.json().then(data=>{
                this.setState({show:true,error:true,added:false,msg:data.msg})
            })
        }
        else{
            this.setState({show:true,added:true});
        }
        })
    }

    closeHandler=()=>{
        this.setState({show:false})
        console.log("offed")
    }

    gotologinHandler=()=>{
        this.props.history.push('/login');
    }

    passwordHandler=(e)=>{
        this.setState({password:e.target.value})
    }
    cpasswordHandler=(e)=>{
        this.setState({cpassword:e.target.value});
        // if(this.state.cpassword==this.state.password){
        //    return this.setState({match:true})
        // }
        // return this.setState({match:false})
    }
    render(){
        return(
            <div className={style.outer}>
                
                {this.state.added?<Backdrop show={this.state.show} >User is added
                    <button onClick={this.gotologinHandler}>go to login</button>
                    <button onClick={this.closeHandler}>cancel</button>
                </Backdrop>:null}
                {
                    this.state.error?<Backdrop onClick={this.closeHandler} show={this.state.show}>{this.state.msg}<button onClick={this.closeHandler}>ok</button></Backdrop>:null
                }
               <p> Sign Up </p>
               Username:<input type="text" value={this.state.usernamae} onChange={this.userNamecheckHandler}></input>
               {this.state.avail?<span className={style.green}>available</span>:<span className={style.red}>Not available</span>}
               password:<input type="text" value={this.state.password} onChange={this.passwordHandler}></input> 
               Confirm password:<input type="text" value={this.state.cpassword} onChange={this.cpasswordHandler}></input>
               {this.state.match?<p>match</p>:<p>not match</p>}
               <button onClick={this.addUserHandler}>sign up</button>
               <button onClick={this.gotologinHandler}>login</button>
            </div>
        )
    }
}

export default withRouter(Siginin);