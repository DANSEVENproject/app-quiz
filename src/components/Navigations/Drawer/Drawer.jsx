import React, {useCallback} from 'react'
import classes from './Drawer.module.css'
import Backdrop from 'components/UI/Backdrop/Backdrop'
import {NavLink} from 'react-router-dom'

const Drawer = (props) => {
    const cls = [classes.Drawer]
    if (!props.isOpen) {
        cls.push(classes.close)
    }
    const links = [
        {to: '/', label: 'Список', exact: true}
    ]

    if(props.isAuthenticated) {
        links.push({to: '/quiz-creator', label: 'Создать тест', exact: false})
        links.push({to: '/logout', label: 'Выйти', exact: false})
    } else {
        links.push({to: '/auth', label: 'Авторизация', exact: false})
    }

    const handleClick = () => {
        props.onClose()
    }

    const renderLinks = useCallback((links) => 
        links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        className={classes.active}
                        onClick={handleClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
            //eslint-disable-next-line
        }), [links])

    return (
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks(links)}
                </ul>
            </nav>
            {props.isOpen ? <Backdrop onClick={props.onClose}/> : null}
        </React.Fragment>
    )
}

export default Drawer