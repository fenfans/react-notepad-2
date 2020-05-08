import React from 'react'
import {Icon} from 'antd-mobile'
import './header.scss'

export function Header(props) {
    const {options = {}} = props
    const {
        left = {},
        title
    } = options
    const { show = false, onClick } = left
    return (
        <React.Fragment>
            <div className='fix-wrapper'>
                <div className='header-wrapper'>
                    {show ? <div className='left' onClick={(e)=>onClick(e)}><Icon type='left'/></div>: null}
                    <div className='title'>{title}</div> 
                </div>
            </div>
            <div className='header-wrapper'/>
        </React.Fragment>
    )
}