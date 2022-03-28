import {useState} from 'react'
import { useSelector } from 'react-redux'
import classes from './Layout.module.css'
import MenuToggle from 'components/Navigations/MenuToggle/MenuToggle'
import Drawer from 'components/Navigations/Drawer/Drawer'
import { connect } from 'react-redux'

const Layout = (props) => {
    //eslint-disable-next-line
    const selector = useSelector(state => {isAuthenticated: !!state.auth.token})
    const [state, setState] = useState({menu: false})

    const toggleMenuHandler = () => {
        setState({
            menu: !state.menu 
        })
    }

    const menuCloseHandler = () => {
        setState({
            menu: false
        })
    }

    return (
        <div className={classes.Layout}>             
            <Drawer 
                isOpen={state.menu}
                onClose={menuCloseHandler}
                isAuthenticated={props.isAuthenticated}
            />
                
            <MenuToggle 
                onToggle={toggleMenuHandler}
                isOpen={state.menu}
            />
                
            <main>
                { props.children}
            </main>
        </div>
    )
}

function isAuthenticated(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(isAuthenticated)(Layout)