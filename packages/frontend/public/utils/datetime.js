/**
 * @param {string} id
 * @return {number?}
 */
function mongoIdToTimestamp(id) {
  if (!id) {
    return;
  }

  const rawDate = parseInt(id.slice(0, 8), 16);

  if (Number.isNaN(rawDate)) {
    return;
  }

  return new Date(parseInt(id.slice(0, 8), 16) * 1000).getTime();
}

export {
  mongoIdToTimestamp
};
