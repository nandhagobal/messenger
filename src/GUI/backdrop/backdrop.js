import React from 'react'
import style from './backdrop.module.css'

const Backdrop =(props)=>{
    return(
        <div className={style.backdrop} style={props.show?null:{display:'none'}}>{props.children}</div>
    )
}

export default Backdrop;