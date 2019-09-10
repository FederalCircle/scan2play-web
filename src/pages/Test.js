import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { appOperations } from '../redux/operations'

const Test = ({ count, operations }) => (
  <div>
    <h1>Test Page</h1>
    <p>Count: {count}</p>
    <button onClick={operations.incrementCount}>Increment coun</button>
    <button onClick={operations.decrementCount}>Decrement coun</button>
  </div>
)

const mapStateToProps = (state) => ({
  count: state.app.count,
})

const mapDispatchToProps = (dispatch) => ({
  operations: bindActionCreators(appOperations, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Test) 