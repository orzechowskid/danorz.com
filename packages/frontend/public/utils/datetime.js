/**
 * @param {string} id
 * @return {Date}
 */
function mongoIdToTimestamp(id) {
  if (!id) {
    throw new Error(`no id provided`);
  }

  const rawDate = parseInt(id.slice(0, 8), 16);

  if (Number.isNaN(rawDate)) {
    return undefined;
  }

  return new Date(parseInt(id.slice(0, 8), 16) * 1000);
}

export {
  mongoIdToTimestamp
};
