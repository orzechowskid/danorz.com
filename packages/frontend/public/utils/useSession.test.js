import {
  renderHook
} from '@testing-library/preact-hooks';

import * as UseRemoteData from './useRemoteData.js';
import {
  useSession
} from './useSession.js';

jest.mock('./useRemoteData.js');

describe(`the useSession hook`, function() {
  describe(`when its network request is in-flight`, function() {
    beforeEach(function() {
      UseRemoteData.useRemoteObject.mockReturnValueOnce({
        busy: true,
        data: undefined
      });
    });

    it(`reports busy=true and isSignedIn=undefined`, function() {
      /** @type {import('@testing-library/react-hooks').RenderHookResult<import('./useSession').Session>} */
      const {
        result
      } = renderHook(useSession);

      expect(result.current.busy).toEqual(true);
      expect(result.current.isSignedIn).toEqual(undefined);
    });
  });

  describe(`when its network request returns no session`, function() {
    beforeEach(function() {
      UseRemoteData.useRemoteObject.mockReturnValueOnce({
        busy: false,
        data: undefined
      });
    });

    it(`reports busy=false and isSignedIn=false`, async function() {
      /** @type {import('@testing-library/react-hooks').RenderHookResult<import('./useSession').Session>} */
      const {
        result
      } = renderHook(useSession);

      expect(result.current.busy).toEqual(false);
      expect(result.current.isSignedIn).toEqual(false);
    });
  });

  describe(`when its network request returns an active session`, function() {
    beforeEach(function() {
      UseRemoteData.useRemoteObject.mockReturnValueOnce({
        busy: false,
        data: {
          isLoggedIn: true
        }
      });
    });

    it(`reports busy=false and isSignedIn=true`, async function() {
      /** @type {import('@testing-library/react-hooks').RenderHookResult<import('./useSession').Session>} */
      const {
        result
      } = renderHook(useSession);

      expect(result.current.busy).toEqual(false);
      expect(result.current.isSignedIn).toEqual(true);
    });
  });
});
