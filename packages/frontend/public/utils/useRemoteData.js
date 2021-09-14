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

const ABOUT_ONE_MONTH_IN_MS = 1000 * 86400 * 30;

const defaultSwrOpts = {
  dedupingInterval: ABOUT_ONE_MONTH_IN_MS,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false
};

function useCallbackFactory(fn, args) {
  return useCallback(fn(...args), args);
}

function getCreateDataFunction(cacheKey, swrOpts, createDataOpts, isCollection) {
  const {
    data,
    mutate
  } = swrOpts
  const {
    apiEndpoint,
    fetchOpts
  } = createDataOpts;

  return isCollection
    ? async function doCreateCollectionResource(nextState) {
      /* step 1: optimistic local update */
      mutate({
        ...data,
        data: [ ...data.data, nextState ]
      }, false);

      /* step 2: make remote update */
      const createEndpoint = apiEndpoint || cacheKey;

      await postData(createEndpoint, nextState, fetchOpts);

      /* step 3: sync local data with remote */
      mutate();
    }
    : async function doCreateResource(nextState) {
      /* step 1: optimistic local update */
      mutate(nextState, false);

      /* step 2: make remote update */
      const createEndpoint = apiEndpoint || cacheKey;
      const response = await postData(createEndpoint, nextState, fetchOpts);

      /* step 3: sync local data with remote */
      mutate(response, false);
    };
}

function getUpdateDataFunction(cacheKey, swrOpts, updateDataOpts, isCollection) {
  const {
    data: swrData,
    mutate
  } = swrOpts
  const {
    apiEndpoint,
    fetchOpts
  } = updateDataOpts;

  return isCollection
    ? async function doUpdateItemInCollection(index, nextState) {
      const next = [
        ...(swrData?.data ?? []).slice(0, index),
        typeof nextState === `function`
          ? nextState(swrData?.data)
          : nextState,
        ...(swrData?.data ?? []).slice(index + 1)
      ];

      /* step 1: optimistic local update */
      mutate({
        ...swrData,
        data: next
      }, false);

      /* step 2: make remote update */
      const updateEndpoint = apiEndpoint || cacheKey;
      const response = await putData(updateEndpoint, next, fetchOpts);

      /* step 3: sync local data with remote */
      mutate(response);
    }
    : async function doUpdate(nextState) {
      const next = typeof nextState === `function`
        ? nextState(swrData?.data)
        : nextState;
      /* step 1: optimistic local update */
      mutate({
        ...swrData,
        data: next
      }, false);

      try {
        /* step 2: make remote update */
        const updateEndpoint = apiEndpoint || cacheKey;
        const response = await putData(updateEndpoint, next, fetchOpts);

        /* step 3: sync local data with remote */
        mutate(response);
      }
      catch (ex) {
        /* rollback by re-fetching remote data */
        mutate();
        /* inform listeners that something went wrong */
        throw ex;
      }
    };
}

function getDeleteDataFunction(cacheKey, swrOpts, deleteDataOpts, isCollection) {
  const {
    data: swrData,
    mutate
  } = swrOpts;
  const {
    apiEndpoint,
    fetchOpts
  } = deleteDataOpts;

  return isCollection
    ? async function doDeleteFromCollection(id) {
      /* step 1: optimistic local update */
      mutate({
        ...swrData,
        data: swrData.data.filter((item) => item._id !== id)
      }, false);

      /* step 2: make remote update */
      const deleteEndpoint = apiEndpoint || cacheKey;
      await deleteData(deleteEndpoint, fetchOpts);

      /* step 3: sync local data with remote */
      mutate();
    }
    : async function doDelete() {
      /* step 1: optimistic local update */
      mutate(undefined, false);

      /* step 2: make remote update */
      const deleteEndpoint = apiEndpoint || cacheKey;
      await deleteData(deleteEndpoint, fetchOpts);

      /* step 3: sync local data with remote */
      mutate(undefined);
    };
}

/**
 * @param {import('~/t').RemoteDataOpts} opts
 * @return {import('~/t').RemoteResource}
 */
function useRemoteData(opts) {
  const {
    apiEndpoint,
    opts: otherOpts = {}
  } = opts;
  const {
    createOpts = {},
    deleteOpts = {},
    raw,
    updateOpts = {},
    ...userSwrOpts
  } = otherOpts;
  const swrOpts = {
    ...defaultSwrOpts,
    ...userSwrOpts
  };
  const swr = useSWR(apiEndpoint, rawRequest, swrOpts);
  // gross!
  const data = raw
    ? swr.data
    : (swr.data?.data?.[0] ?? {});
  const metadata = raw
    ? undefined
    : (swr.data?.metadata ?? {});

  /* remote get operation */
  const get = {
    data: {
      data,
      metadata
    },
    error: swr.error,
    execute: swr.mutate
  };

  /* remote create operation */
  const [ createError, setCreateError ] = useState(null);
  const [ createState, setCreateState ] = useState(`ready`);
  const doCreate = useCallbackFactory(
    getCreateDataFunction,
    [ apiEndpoint, swr, createOpts ]
  );
  const create = {
    error: createError,
    execute: async function() {
      try {
        setCreateError(undefined);
        setCreateState(`busy`);
        await doCreate();
        setCreateState(`ready`);
      }
      catch (ex) {
        setCreateState(`error`);
        setCreateError(ex);
      }
    },
    state: createState
  };
  /* remote update operation */

  /** @type {import('preact/hooks').StateUpdater<Error>} */
  const [ updateError, setUpdateError ] = useState(null);
  /** @type {import('preact/hooks').StateUpdater<import('~/t').RemoteOperationState>} */
  const [ updateState, setUpdateState ] = useState(`ready`);
  const doUpdate = useCallbackFactory(
    getUpdateDataFunction,
    [ apiEndpoint, swr, updateOpts ]
  );
  const update = {
    error: updateError,
    execute: async function(next) {
      try {
        setUpdateError(undefined);
        setUpdateState(`busy`);
        await doUpdate(next);
        setUpdateState(`success`);
      }
      catch (ex) {
        setUpdateState(`error`);
        setUpdateError(ex);
      }
    },
    state: updateState
  };
  /* remote delete operation */
  const [ deleteError, setDeleteError ] = useState(null);
  const [ deleteState, setDeleteState ] = useState(`ready`);
  const doDelete = useCallbackFactory(
    getDeleteDataFunction,
    [ apiEndpoint, swr, deleteOpts ]
  );
  const del = {
    error: deleteError,
    execute: async function() {
      try {
        setDeleteError(undefined);
        setDeleteState(`busy`);
        await doDelete();
        setDeleteState(`success`);
      }
      catch (ex) {
        setDeleteState(`error`);
        setDeleteError(ex);
      }
    },
    state: deleteState
  };

  return {
    create,
    data, // deprecated
    del, /* sigh */
    get,
    metadata, // deprecated
    update
  };
}

/**
 * @param {import('~/t').RemoteCollectionOpts} opts}
 * @return {import('~/t').RemoteCollection}
 */
function useRemoteCollection(opts) {
  const {
    apiEndpoint,
    createOpts = {},
    deleteOpts = {},
    initialData,
    raw,
    updateOpts = {}
  } = opts;
  const swrOpts = {
    ...defaultSwrOpts,
    initialData
  };
  const swr = useSWR(apiEndpoint, rawRequest, swrOpts);
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

  /* remote get operation */
  const get = {
    data: {
      data,
      metadata
    },
    error: swr.error,
    execute: swr.mutate
  };

  /* remote create operation */
  const [ createError, setCreateError ] = useState(null);
  const [ createState, setCreateState ] = useState(`ready`);
  const doCreate = useCallbackFactory(
    getCreateDataFunction,
    [ apiEndpoint, swr, createOpts ]
  );
  const create = {
    error: createError,
    execute: async function() {
      try {
        setCreateError(undefined);
        setCreateState(`busy`);
        await doCreate();
        setCreateState(`ready`);
      }
      catch (ex) {
        setCreateState(`error`);
        setCreateError(ex);
      }
    },
    state: createState
  };
  /* remote update operation */

  /** @type {import('preact/hooks').StateUpdater<Error>} */
  const [ updateError, setUpdateError ] = useState(null);
  /** @type {import('preact/hooks').StateUpdater<import('~/t').RemoteOperationState>} */
  const [ updateState, setUpdateState ] = useState(`ready`);
  const doUpdate = useCallbackFactory(
    getUpdateDataFunction,
    [ apiEndpoint, swr, updateOpts, true ]
  );
  const update = {
    error: updateError,
    execute: async function(next) {
      try {
        setUpdateError(undefined);
        setUpdateState(`busy`);
        await doUpdate(next);
        setUpdateState(`success`);
      }
      catch (ex) {
        setUpdateState(`error`);
        setUpdateError(ex);
      }
    },
    state: updateState
  };
  /* remote delete operation */
  const [ deleteError, setDeleteError ] = useState(null);
  const [ deleteState, setDeleteState ] = useState(`ready`);
  const doDelete = useCallbackFactory(
    getDeleteDataFunction,
    [ apiEndpoint, swr, deleteOpts ]
  );
  const del = {
    error: deleteError,
    execute: async function() {
      try {
        setDeleteError(undefined);
        setDeleteState(`busy`);
        await doDelete();
        setDeleteState(`success`);
      }
      catch (ex) {
        setDeleteState(`error`);
        setDeleteError(ex);
      }
    },
    state: deleteState
  };

  return {
    create,
    data, // deprecated
    del,
    error, // deprecated
    get,
    metadata, // deprecated
    update
  };
}

export {
  useRemoteData,
  useRemoteCollection
};
