import {useEffect} from 'react'
import Layout from 'hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from 'containers/Quiz/Quiz'
import QuizList from 'containers/QuizList/QuizList'
import QuizCreator from 'containers/QuizCreator/QuizCreator'
import Auth from 'containers/Auth/Auth'
import {useDispatch, useSelector } from 'react-redux'
import Logout from 'components/Logout/logout'
import { autoLogin } from 'store/actions/auth'
import { isAuthenticate } from 'store/selectors/selectors'

const App = () => {
  const dispatch = useDispatch()
  const selector = useSelector(isAuthenticate)

  useEffect(() => {
    dispatch(autoLogin())
    //eslint-disable-next-line
  }, [selector.isAuthenticated])

  const conditionStructure = () => {
    if(!selector.isAuthenticated) {
      return (
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/' exact component={QuizList}/>
          <Redirect to="/" />
        </Switch>
      )
    } else {
      return (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator}/>
          <Route path='/quiz/:id' component={Quiz}/>
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList}/>
          <Redirect to="/" />
        </Switch>
      )
    }
  }

  return (
    <Layout>
      { conditionStructure() }
    </Layout>
  )
}

export default withRouter(App)
