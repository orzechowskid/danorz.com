import mongoose from 'mongoose';

import {
  ISO_8601_REGEX
} from '../../utils.js';
import {
  runStandardGetQuery
} from './utils.js';

/** @type {import('mongoose').SchemaOptions} */
const opts = {
  collection: `peerRequests`,
  strict: `throw`
}

/** @type {import('mongoose').Schema<import('dto').RemotePeerRequest>} */
export const PeerRequestSchema = new mongoose.Schema({
  status: {
    enum: [ `requested`, `awaitingVerification` ],
    required: true,
    type: String
  },
  timestamp: {
    match: ISO_8601_REGEX,
    required: true,
    type: String
  },
  url: {
    required: true,
    type: String
  }
}, opts);

/** @type {import('mongoose').Model<import('dto').RemotePeerRequest>} */
const PeerRequest = mongoose.model(`PeerRequest`, PeerRequestSchema);

/** @type {import('~/t').DBQueryFunction<import('dto').RemotePeerRequest>} */
export const getRemotePeerRequests = async function(dbQuery) {
  return runStandardGetQuery(PeerRequest, dbQuery);
};
