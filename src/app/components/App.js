import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'

class App extends React.Component {

  render () {
    return (
      <div>
        <Header />

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)