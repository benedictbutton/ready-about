import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DictionaryToolbar from '../Dictionary/Toolbar';
import ScriptsToolbar from '../Scripts/Toolbar';
import TodosToolbar from '../Todos/Toolbar';

const Toolbars = ({ menuSwitch, setMenuSwitch, ...props }) => {
  return (
    <Switch>
      <Route
        path="/in/dictionary"
        render={() => (
          <DictionaryToolbar
            menuSwitch={menuSwitch}
            setMenuSwitch={setMenuSwitch}
            color="#3B5768"
            {...props}
          />
        )}
      />

      <Route
        path="/in/todos"
        render={() => (
          <TodosToolbar
            menuSwitch={menuSwitch}
            setMenuSwitch={setMenuSwitch}
            color="#191970"
            {...props}
          />
        )}
      />
      <Route
        path="/in/scripts"
        render={() => (
          <ScriptsToolbar
            menuSwitch={menuSwitch}
            setMenuSwitch={setMenuSwitch}
            color="#00000"
            {...props}
          />
        )}
      />
    </Switch>
  );
};

export default Toolbars;
