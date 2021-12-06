import React,{Component} from 'react';
import style from './outline.module.css'
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Outline extends Component{
    state={
        msg:[]
    }
    chatHandler=(name)=>{
        console.log('chatHAndler')
        this.props.chatHandler();
        this.props.history.push('chat/'+name);
        // this.props.history.push('check');
    }
    
    componentWillMount=()=>{
        axios({
            url:"http://localhost:8080/getRecent",
            method:"post",
            data:{token:this.props.token},
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            console.log(res.data);
            var user=[];
            user=res.data.map(ele=>{
                return ele.username;
            })
            this.setState({msg:[... user]})
            console.log(this.state.msg);
        })
    }

    render(){
        // console.log(this.props);
        return(
            <div className={style.outer}>
                {this.state.msg.map((ele)=>{
        return <div key={ele} onClick={()=>this.chatHandler(ele)} className={style.message}>
                    <div className={style.img}>
                    </div>
                    {ele}
                </div>
        })}
            </div>
        )
    }
}

export default withRouter(Outline);