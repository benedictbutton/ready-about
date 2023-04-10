// import { useState } from 'react';

// const useSwitch = () => {
//   const [menuSwitch, setMenuSwitch] = useState(true);
//   const [page, setPage] = useState('todos');

//   return [menuSwitch, setMenuSwitch, page, setPage];
// };

// export default useSwitch;

import { useState, useEffect, useMemo } from 'react';

function observeSiteHeaderHooks(target) {
  let listeners = []; // initial listeners can be passed an an argument as well
  let value = target;

  function get() {
    return value;
  }

  function set(newValue) {
    if (value === newValue) return;
    value = newValue;
    listeners.forEach(l => l(value));
  }

  function unsubscribe(listenerFunc) {
    listeners = listeners.filter(l => l !== listenerFunc);
  }

  function subscribe(listenerFunc) {
    listeners.push(listenerFunc);
    return () => unsubscribe(listenerFunc); // will be used inside React.useEffect
  }

  return {
    get,
    set,
    subscribe,
  };
}

/*
 * Switch View for Assets
 */
const switchViewAssetStore = observeSiteHeaderHooks(false);

export function useAssetSwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewAssetStore.get(),
  );

  useEffect(() => {
    return switchViewAssetStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return bool => switchViewAssetStore.set(bool);
  }, []);

  return [switchView, actions];
}

/*
 * Switch View for Contacts
 */

const switchViewContactStore = observeSiteHeaderHooks('todos');

export function useContactSwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewContactStore.get(),
  );

  useEffect(() => {
    return switchViewContactStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return string => switchViewContactStore.set(string);
  }, []);

  return [switchView, actions];
}

/*
 * Switch View for Documents
 */
const switchViewDocumentStore = observeSiteHeaderHooks(false);

export function useDocumentSwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewDocumentStore.get(),
  );

  useEffect(() => {
    return switchViewDocumentStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return bool => switchViewDocumentStore.set(bool);
  }, []);

  return [switchView, actions];
}

/*
 * Switch View for Projects
 */
const switchViewProjectStore = observeSiteHeaderHooks(false);

export function useProjectSwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewProjectStore.get(),
  );

  useEffect(() => {
    return switchViewProjectStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return bool => switchViewProjectStore.set(bool);
  }, []);

  return [switchView, actions];
}

/*
 * Switch View for Properties
 */
const switchViewPropertyStore = observeSiteHeaderHooks(false);

export function usePropertySwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewPropertyStore.get(),
  );

  useEffect(() => {
    return switchViewPropertyStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return bool => switchViewPropertyStore.set(bool);
  }, []);

  return [switchView, actions];
}

/*
 * Switch View for Workflows
 */
const switchViewWorkflowStore = observeSiteHeaderHooks(false);

export function useWorkflowSwitchView() {
  const [switchView, setSwitchView] = useState(
    switchViewWorkflowStore.get(),
  );

  useEffect(() => {
    return switchViewWorkflowStore.subscribe(setSwitchView);
  }, []);

  const actions = useMemo(() => {
    return bool => switchViewWorkflowStore.set(bool);
  }, []);

  return [switchView, actions];
}
