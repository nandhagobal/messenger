import React, { Component } from 'react'
import style from './heading.module.css'
import {Route, NavLink, Switch} from 'react-router-dom'
import Outline from '../chatComponent/outline/outline'

class Heading extends Component{
    render(){
        return(
            <div className={style.heading}>
            <div className={style.outer}>
                <div className={style.sub}>
                <span>
                WhatsApp</span>
                </div>
                <nav className={style.nav}>
                    <NavLink to='/chat' activeClassName={style.active} className={style.navlink}>CHAT</NavLink>
                    <NavLink to='/status' activeClassName={style.active} className={style.navlink}>STATUS</NavLink>
                    <NavLink to='/contact' activeClassName={style.active} className={style.navlink}>CALL</NavLink>
                  </nav>
                  </div>
            </div>
        )
    }
}

export default Heading;