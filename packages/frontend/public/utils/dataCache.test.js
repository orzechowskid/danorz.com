import {
  DataCache
} from './dataCache.js';

describe(`the DataCache class`, function() {
  describe(`when manually invoked`, function() {
    /** @type {DataCache} */
    let cache;

    beforeEach(function() {
      cache = new DataCache();
    });

    it(`sets and gets with the same key`, function() {
      cache.set(`my-key`, 123);

      const value = cache.get(`my-key`);

      expect(value.data).toEqual(123);
    });

    it(`respects the TTL argument of set()`, function() {
      jest.useFakeTimers();

      const ttl = 1000;

      cache.set(`my-key`, 123, ttl);
      jest.advanceTimersByTime(1001);
      const data = cache.get(`my-key`);

      expect(data).toEqual(undefined);
    });

    it(`clears correctly`, function() {
      cache.set(`my-key`, 123);
      cache.clear(`my-key`);
      const data = cache.get(`my-key`);

      expect(data).toEqual(undefined);
    });
  });

  describe(`when listening for updates`, function() {
    const key = `my-key`;
    /** @type {DataCache} */
    let cache;

    beforeEach(function() {
      cache = new DataCache();
    });

    it(`fires an event when a cache update is made at the given key`, function() {
      const listener = jest.fn();

      cache.on(key, listener);
      cache.set(key, 123);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it(`doesn't fire an event if a listener has been removed`, function() {
      const listener = jest.fn();

      cache.on(key, listener);
      cache.off(key, listener);
      cache.set(key, 123);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
