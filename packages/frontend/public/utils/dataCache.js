import mitt from 'mitt';

/**
 * @typedef CacheEntry
 * @property {number} createdAt
 * @property {T} data
 * @property {number} ttl
 * @template T
 */

const DEFAULT_TTL = 30000; /* ms */

class DataCache {
  /** @type {Record<string, CacheEntry<any>>} */
  data = {}

  emitter = mitt()

  on = this.emitter.on
  off = this.emitter.off

  /**
   * @param {string} path
   */
  get(path) {
    const entry = this.data[path];

    if (entry && (entry.ttl === -1 || (Date.now() - entry.createdAt <= entry.ttl))) {
      return entry;
    }

    return undefined;
  }

  /**
   * @param {string} path
   * @param {any} data
   * @param {number} [ttl]
   */
  set(path, data, ttl) {
    this.data[path] = {
      createdAt: Date.now(),
      data,
      ttl: ttl ?? DEFAULT_TTL
    }

    this.emitter.emit(path, data);
  }

  /**
   * @param {string} path
   */
  clear(path) {
    delete this.data[path];
  }
}

export {
  DataCache
};
