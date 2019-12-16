import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Entryway from './components/Entryway';
import Inside from './components/Inside';
import Outside from './components/Outside';
import Profile from './components/Profile';
import Todos from './components/Todos';

const App = () => {
  return (
    <main className="App App-header home">
      <Route exact path="/" component={Outside} />
      <Route path="/in" component={Inside} />
      <Switch>
        <Route path="/entryway" component={Entryway} />
        <Route path="/in/profile" component={Profile} />
        <Route path="/in/todos" component={Todos} />
      </Switch>
    </main>
  );
};

export default App;
