import React, {Component} from 'react'
import Layout from '@hoc-layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Quiz from '@containers-quiz/Quiz'
import QuizList from '@containers-list/QuizList'
import QuizCreator from '@containers-creator/QuizCreator'
import Auth from '@containers-auth/Auth'
import { connect } from 'react-redux'
import Logout from '@components-logout/logout'
import { autoLogin } from '@actions/auth'

class App extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}/>
        <Route path='/quiz/:id' component={Quiz}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path='/quiz-creator' component={QuizCreator}/>
            <Route path='/quiz/:id' component={Quiz}/>
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={QuizList}/>
            <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { routes }
      </Layout>
    )
  }
}

function mapStateToProps({auth}) {
  return {
    isAuthenticated: !!auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
