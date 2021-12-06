import React, { Component } from 'react'
import style from './chatarea.module.css'
import { Switch, Route } from 'react-router-dom'
import Outline from '../outline/outline'
import axios from 'axios'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

class chatArea extends Component{
    state={
        msg:[{msg:"hi",sender:'1',receiver:'2',time:"21:38",key:12346},{msg:"hi",sender:'2',receiver:'1',time:"21:39",key:12347},{msg:"how are u",sender:'1',receiver:'2',time:"21:39",key:12348},{msg:"fine",sender:'2',receiver:'1',time:"21:40",key:1234}],
        temp:'',
        sender:'',
        receiver:''

    }
    componentWillMount=()=>{
        
    }
    componentDidMount =()=>{
        axios({
            url:'http://localhost:8080/getUser',
            method:'post',
            data:this.props.token,
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            // console.log(res.data);
            this.setState({sender:res.data})
            var rev=this.props.match.url.split('/')[2]
            this.setState({sender:res.data,receiver:rev});
            
        }).then(()=>{
        console.log("receiver "+this.state.receiver)
        axios({
            url:'http://localhost:8080/getMsg',
            method:'post',
            data:{sender:this.state.sender,receiver:this.state.receiver},
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            // console.log(res.data)
            var arr=res.data.msg.map(e=> {
                return e
            })
            this.setState({
                msg:[...arr]
            });
            document.querySelector('#msg_area').scrollTo(0,document.querySelector('#msg_area').scrollHeight);
        })
    })
    }

    sentHandler(){
        var arr=this.state.msg;
        var t={msg:this.state.temp,sender:this.state.sender,receiver:this.state.receiver,time:new Date().getHours().toString()+':'+new Date().getMinutes().toString(),key:new Date().getTime()}
        arr.push(t);
        this.setState({msg:arr,temp:''});
        axios({
            url:'http://localhost:8080/storeMsg',
            method:'post',
            data:{token:this.props.token,msg:t},
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            // console.log(res.data)
            
            document.querySelector('#msg_area').scrollTo(0,document.querySelector('#msg_area').scrollHeight);
            // window.scrollTo(0,document.querySelector('#msg_area').scrollHeight);
        })
    }
    store(e){
        this.setState({temp:e.target.value});
    }

    render(){
        var list;
        list=this.state.msg.map(ele=>{
            // console.log(ele)
        return <div key={ele.key} className={ele.sender===this.state.sender ? style.bottomRight:style.bottomLeft}><span className={style.span}>{ele.msg}</span><div>{ele.time}</div></div>
        }
        );
        
    return(
        <div className={style.outer}>
            <div id="msg_area" className={style.msgText}>
                {list}
            </div>
           <div className={style.msgBox}>
               <span className={style.emoji}><i class="fas fa-grin"></i></span>
               <input type="text" name="msg" placeholder="Type a message" value={this.state.temp} onChange={e=>this.store(e)}></input>
               <span className={style.send} onClick={e=>this.sentHandler()}><i class="far fa-paper-plane"></i></span>
           </div>
        </div>
    )
    }
}

export default withRouter(chatArea);