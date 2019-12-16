import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas';
import { loadState, saveState } from './localStorage';

const logger = createLogger();
const saga = createSagaMiddleware();
const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(saga, logger),
);

saga.run(rootSaga);

store.subscribe(
  throttle(() => {
    const { successful } = store.getState().user;
    if (successful) {
      saveState({
        user: store.getState().user,
        todos: store.getState().todos,
      });
    }
  }, 1000),
);

export { store };
