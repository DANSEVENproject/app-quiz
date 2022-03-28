import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {logout} from 'store/actions/auth'


const Logout = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => null)
    //eslint-disable-next-line
    useEffect(() => dispatch(logout()), [state])

    return <Redirect to='/' />
}

export default Logout