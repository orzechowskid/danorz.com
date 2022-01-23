import {
  DataCache
} from './dataCache.js';

describe(`the DataCache class`, function() {
  describe(`when manually invoked`, function() {
    it(`sets and gets with the same key`, function() {
      const cache = new DataCache();

      cache.set(`my-key`, 123);

      const value = cache.get(`my-key`);

      expect(value.data).toEqual(123);
    });
  });

  describe(`when listening for updates`, function() {
    const listener = jest.fn();
    const key = `my-key`;
    let cache;

    beforeEach(function() {
      cache = new DataCache();
      cache.on(key, listener);
    });

    afterEach(function() {
      cache.off(key, listener);
    });

    it(`fires an event when a cache update is made at the given key`, function() {
      cache.set(key, 123);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
