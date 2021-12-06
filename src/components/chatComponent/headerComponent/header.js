import React, { Component } from 'react'
import style from './header.module.css'
import { withRouter } from 'react-router-dom';

class Header extends Component{
    backHandler=()=>{
        this.props.chatHandler();
        this.props.history.push('/chat');
    }
    render(){
        console.log(this.props)
        return(
            <header className={style.header}>
                
                <div className={style.backArrow} onClick={this.backHandler}><i className="fas fa-arrow-left"></i></div>
                <div className={style.img}></div>
                <span>{this.props.match.params.name}</span>
                <div className={style.video}> <i className="fas fa-video"></i></div>
                <div className={style.call}> <i className="fas fa-phone"></i></div>
                <div className={style.menu}><i class="fas fa-ellipsis-v"></i></div>

            </header>
        )
    }
}

export default withRouter(Header);