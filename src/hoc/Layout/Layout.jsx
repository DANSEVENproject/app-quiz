import {useState} from 'react'
import { useSelector } from 'react-redux'
import classes from './Layout.module.css'
import MenuToggle from 'components/Navigations/MenuToggle/MenuToggle'
import Drawer from 'components/Navigations/Drawer/Drawer'
import { isAuthenticate } from 'store/selectors/selectors'

const Layout = ({children}) => {
    const selector = useSelector(isAuthenticate)
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
                isAuthenticated={selector.isAuthenticated}
            />
                
            <MenuToggle 
                onToggle={toggleMenuHandler}
                isOpen={state.menu}
            />
                
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout