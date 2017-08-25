import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import test from './reducers/test'

export default createStore(
  combineReducers({
    test
  }),
  {},
  applyMiddleware(logger)
)