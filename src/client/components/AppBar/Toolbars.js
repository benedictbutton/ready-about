import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import DictionaryToolbar from '../Dictionary/Toolbar';
import ScriptsToolbar from '../Scripts/Toolbar';
import TodosToolbar from '../Todos/Toolbar';

const Toolbars = ({ menuSwitch, setMenuSwitch, ...props }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/in/dictionary' && (
        <DictionaryToolbar
          menuSwitch={menuSwitch}
          setMenuSwitch={setMenuSwitch}
          color="#3B5768"
          {...props}
        />
      )}

      {location.pathname === '/in/todos' && (
        <TodosToolbar
          menuSwitch={menuSwitch}
          setMenuSwitch={setMenuSwitch}
          color="#191970"
          {...props}
        />
      )}

      {location.pathname === '/in/scripts' && (
        <ScriptsToolbar
          menuSwitch={menuSwitch}
          setMenuSwitch={setMenuSwitch}
          color="#00000"
          {...props}
        />
      )}
    </>
  );
};

export default Toolbars;
