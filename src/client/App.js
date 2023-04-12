import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dictionary from './components/Dictionary/Dictionary';
import Entryway from './components/Authentication/Entryway';
import Inside from './components/Authentication/Inside';
import Outside from './components/Authentication/Outside';
import Todos from './components/Todos/Todos';
import Scripts from './components/Scripts/Scripts';
import { AnimatePresence } from 'framer-motion';

const App = () => {
  const location = useLocation();
  return (
    <main className="App App-header home">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location?.pathname}>
          <Route exact path="/" element={<Outside />} />
          <Route path="entryway" element={<Entryway />} />
          <Route path="in" element={<Inside />}>
            <Route path="todos" element={<Todos />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="scripts" element={<Scripts />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </main>
  );
};

export default App;
