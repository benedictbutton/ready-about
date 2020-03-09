import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dictionary from './components/Dictionary/Dictionary';
import Entryway from './components/Authentication/Entryway';
import Inside from './components/Authentication/Inside';
import Outside from './components/Authentication/Outside';
import Todos from './components/Todos/Todos';

const App = () => {
  return (
    <main className="App App-header home">
      <Route exact path="/" component={Outside} />
      <Route path="/in" component={Inside} />
      <Switch>
        <Route path="/entryway" component={Entryway} />
        <Route path="/in/todos" component={Todos} />
        <Route path="/in/dictionary" component={Dictionary} />
      </Switch>
    </main>
  );
};

export default App;
