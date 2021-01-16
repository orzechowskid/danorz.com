function mapObjectValues(obj, mapFn) {
  return Object.entries(obj).reduce(
    (acc, [ k, v ]) => ({ ...acc, [k]: mapFn(v) }), {}
  );
}

export {
  mapObjectValues
};
