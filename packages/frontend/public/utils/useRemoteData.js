import {
  useCallback,
  useState
} from 'preact/hooks';
import useSWR from 'swr';

import {
  deleteData,
  postData,
  putData,
  rawRequest
} from '~/utils/api.js';

const ABOUT_ONE_DAY_IN_MS = 1000 * 86400;
const ABOUT_ONE_MONTH_IN_MS = ABOUT_ONE_DAY_IN_MS * 30;

const defaultSwrOpts = {
  dedupingInterval: ABOUT_ONE_MONTH_IN_MS,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false
};

/**
 * @description factory for building create-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {(newObj: Partial<Payload>) => Promise<void>}
 * @template Payload
 */
function getCreateObjectFunction(swrInstance, remoteDataOpts) {
  const {
    data: prevState,
    mutate
  } = swrInstance
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doCreateObject(newObj) {
    /* step 1: optimistic local update */
    mutate({
      ...prevState,  data: [ newObj ]
    }, false);

    /* step 2: make remote update */
    const createEndpoint = apiEndpoint || cacheKey;
    const response = await postData(createEndpoint, newObj, fetchOpts?.createOpts);

    /* step 3: sync local data with remote */
    mutate(response, false);
  };
}

/**
 * @description factory for building create-collection-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {(newObj: Partial<Payload>) => Promise<void>}
 * @template Payload
 */
function getCreateCollectionObjectFunction(swrInstance, remoteDataOpts) {
  const {
    data,
    mutate
  } = swrInstance
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doCreateCollectionObject(newObj) {
    /* step 1: optimistic local update */
    mutate({
      ...data,
      data: [ ...data.data, newObj ]
    }, false);

    /* step 2: make remote update */
    const createEndpoint = apiEndpoint || cacheKey;

    await postData(createEndpoint, newObj, fetchOpts?.createOpts);

    /* step 3: sync local data with remote */
    mutate();
  };
}

/**
 * @description factory for building update-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {(newObj: Partial<Payload>) => Promise<void>}
 * @template Payload
 */
function getUpdateObjectFunction(swrInstance, remoteDataOpts) {
  const {
    data: prevState,
    mutate
  } = swrInstance
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doUpdateObject(newObj) {
    /* step 1: optimistic local update */
    mutate({
      ...prevState, data: [ newObj ]
    }, false);

    /* step 2: make remote update */
    const updateEndpoint = apiEndpoint || cacheKey;
    const response = await putData(updateEndpoint, newObj, fetchOpts?.updateOpts);

    /* step 3: sync local data with remote */
    mutate(response, false);
  };
}

/**
 * @description factory for building update-collection-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {(newObj: import('~/t').Indexed<Payload>) => Promise<void>}
 * @template Payload
 */
function getUpdateCollectionObjectFunction(swrInstance, remoteDataOpts) {
  const {
    data: prevState,
    mutate
  } = swrInstance
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doUpdateCollectionObject(newObj) {
    /* step 1: optimistic local update */
    const idx = prevState.data.findIndex((obj) => obj._id === newObj._id);

    mutate({
      ...prevState,
      data: [
        ...prevState.data.slice(0, idx),
        newObj,
        ...prevState.data.slice(idx + 1)
      ]
    }, false);

    /* step 2: make remote update */
    const updateEndpoint = apiEndpoint || cacheKey;

    await putData(updateEndpoint, newObj, fetchOpts?.createOpts);

    /* step 3: sync local data with remote */
    mutate();
  };
}

/**
 * @description factory for building delete-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {() => Promise<void>}
 * @template Payload
 */
function getDeleteObjectFunction(swrInstance, remoteDataOpts) {
  const {
    mutate
  } = swrInstance
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doDeleteObject() {
    /* step 1: optimistic local update */
    mutate(undefined, false);

    /* step 2: make remote update */
    const deleteEndpoint = apiEndpoint || cacheKey;

    await deleteData(deleteEndpoint, fetchOpts?.deleteOpts);

    /* step 3: sync local data with remote */
    mutate(undefined);
  };
}


/**
 * @description factory for building delete-collection-object functions
 *
 * @param {import('~/t').SWR<Payload>} swrInstance}
 * @param {import('~/t').RemoteDataOpts} remoteDataOpts}
 * @return {(obj: import('~/t').Indexed<Payload>) => Promise<void>}
 * @template Payload
 */
function getDeleteCollectionObjectFunction(swrInstance, remoteDataOpts) {
  const {
    data: prevState,
    mutate
  } = swrInstance;
  const {
    apiEndpoint,
    cacheKey,
    fetchOpts
  } = remoteDataOpts;

  return async function doDeleteFromCollection(oldObj) {
    /* step 1: optimistic local update */
    const idx = prevState.data.findIndex((obj) => obj._id === oldObj._id);
    mutate({
      ...prevState,
      data: [
        ...prevState.data.slice(0, idx),
        ...prevState.data.slice(idx + 1)
      ]
    }, false);

    /* step 2: make remote update */
    const deleteEndpoint = apiEndpoint || cacheKey;
    await deleteData(deleteEndpoint, fetchOpts?.deleteOpts);

    /* step 3: sync local data with remote */
    mutate();
  };
}

/**
 * @description hook for manipulating a single piece of backend data
 *
 * @param {import('~/t').RemoteDataOpts} opts
 * @return {import('~/t').RemoteResource<Payload, CreateShape, void, UpdateShape>}
 * @template Payload
 * @template CreateShape = Partial<Payload>
 * @template UpdateShape = Payload
 */
function useRemoteData(opts) {
  const {
    apiEndpoint,
    fetchOpts: otherOpts
  } = opts;
  const {
    createOpts: _createOpts,
    deleteOpts: _deleteOpts,
    raw,
    updateOpts: _updateOpts,
    ...userSwrOpts
  } = otherOpts ?? {};
  const swrInstance = {
    ...defaultSwrOpts,
    ...userSwrOpts
  };
  const swr = useSWR(apiEndpoint, rawRequest, swrInstance);
  const {
    data: swrData,
    error
  } = swr;
  /* data data data data */
  const data = raw
    ? swrData
    : (swrData?.data?.[0] ?? {});
  const metadata = raw
    ? undefined
    : (swrData?.metadata ?? {});

  /* build the remote create operation */

  /** @type {import('~/t').LocalState<string|Error|null>} */
  const [ createError, setCreateError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ createInProgress, setCreateInProgress ] = useState(false);
  const createFn = useCallback(
    getCreateObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<CreateShape>} */
  const doCreate = {
    busy: createInProgress,
    error: createError,
    execute: async function(newObject) {
      setCreateError(undefined);
      setCreateInProgress(true);

      try {
        await createFn(newObject);
      }
      catch (ex) {
        setCreateError(ex);
      }

      setCreateInProgress(false);
    }
  };

  /* build the remote update operation */

  /** @type {import('~/t').LocalState<string|Error>} */
  const [ updateError, setUpdateError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ updateInProgress, setUpdateInProgress ] = useState(false);
  const updateFn = useCallback(
    getUpdateObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<UpdateShape>} */
  const doUpdate = {
    busy: updateInProgress,
    error: updateError,
    execute: async function(next) {
      setUpdateError(undefined);
      setUpdateInProgress(true);

      try {
        await updateFn(next);
      }
      catch (ex) {
        setUpdateError(ex);
      }

      setUpdateInProgress(false);
    }
  };

  /* build the remote delete operation */

  /** @type {import('~/t').LocalState<string|Error>} */
  const [ deleteError, setDeleteError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ deleteInProgress, setDeleteInProgress ] = useState(false);
  const deleteFn = useCallback(
    getDeleteObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<void>} */
  const doDelete = {
    busy: deleteInProgress,
    error: deleteError,
    execute: async function() {
      setDeleteError(undefined);
      setDeleteInProgress(true);

      try {
        await deleteFn();
      }
      catch (ex) {
        setDeleteError(ex);
      }

      setDeleteInProgress(false);
    }
  };
  const getInProgress = (!metadata && !error);
  const busy =
    [ getInProgress, createInProgress, updateInProgress, deleteInProgress ]
      .reduce(
        (acc, st) => (acc && !!st),
        true
      );

  return {
    busy,
    data,
    doCreate,
    doDelete,
    doUpdate,
    error,
    metadata
  };
}

/**
 * @description hook for manipulating a single piece of backend data
 *
 * @param {import('~/t').RemoteDataOpts} opts
 * @return {import('~/t').RemoteCollection<Payload, CreateShape, DeleteShape, UpdateShape>}
 * @template Payload
 * @template CreateShape = Partial<Payload>
 * @template UpdateShape = Indexed<Payload>
 * @template DeleteShape = Indexed<Payload>
 */
function useRemoteCollection(opts) {
  const {
    apiEndpoint,
    fetchOpts: otherOpts
  } = opts;
  const {
    createOpts: _createOpts,
    deleteOpts: _deleteOpts,
    raw,
    updateOpts: _updateOpts,
    ...userSwrOpts
  } = otherOpts ?? {};
  const swrInstance = {
    ...defaultSwrOpts,
    ...userSwrOpts
  };
  const swr = useSWR(apiEndpoint, rawRequest, swrInstance);
  const {
    data: swrData,
    error
  } = swr;
  const data = raw
    ? swrData
    : (swrData?.data ?? []);
  const metadata = raw
    ? undefined
    : (swrData?.metadata ?? {});

  /* build the remote create operation */

  /** @type {import('~/t').LocalState<string|Error|null>} */
  const [ createError, setCreateError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ createInProgress, setCreateInProgress ] = useState(false);
  const createFn = useCallback(
    getCreateCollectionObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<CreateShape>} */
  const doCreate = {
    busy: createInProgress,
    error: createError,
    execute: async function(newObject) {
      setCreateInProgress(true);
      setCreateError(undefined);

      try {
        await createFn(newObject);
      }
      catch (ex) {
        setCreateError(ex);
      }

      setCreateInProgress(false);
    }
  };

  /* build the remote update operation */

  /** @type {import('~/t').LocalState<string|Error|null>} */
  const [ updateError, setUpdateError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ updateInProgress, setUpdateInProgress ] = useState(false);
  const updateFn = useCallback(
    getUpdateCollectionObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<UpdateShape>} */
  const doUpdate = {
    busy: updateInProgress,
    error: updateError,
    execute: async function(newObject) {
      setUpdateInProgress(true);

      try {
        setUpdateError(undefined);
        await updateFn(newObject);
      }
      catch (ex) {
        setUpdateError(ex);
      }

      setUpdateInProgress(false);
    }
  };

  /* build the remote delete operation */

  /** @type {import('~/t').LocalState<string|Error|null>} */
  const [ deleteError, setDeleteError ] = useState(null);
  /** @type {import('~/t').LocalState<boolean>} */
  const [ deleteInProgress, setDeleteInProgress ] = useState(false);
  const deleteFn = useCallback(
    getDeleteCollectionObjectFunction(swr, opts),
    [ swr, opts ]
  );
  /** @type {import('~/t').RemoteOperation<DeleteShape>} */
  const doDelete = {
    busy: deleteInProgress,
    error: deleteError,
    execute: async function(obj) {
      setDeleteInProgress(true);

      try {
        setDeleteError(undefined);
        await deleteFn(obj);
      }
      catch (ex) {
        setDeleteError(ex);
      }

      setDeleteInProgress(false);
    }
  };
  const getInProgress = (!metadata && !error);
  const busy =
    [ getInProgress, createInProgress, updateInProgress, deleteInProgress ]
      .reduce(
        (acc, st) => (acc && !!st),
        true
      );

  return {
    busy,
    data,
    doCreate,
    doDelete,
    doUpdate,
    metadata
  };
}

export {
  useRemoteData,
  useRemoteCollection
};
