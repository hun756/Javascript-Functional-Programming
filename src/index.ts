export * from './types';

export * from './utils';

export * from './collections';

export * from './arrays';

export {
    groupBy,
    indexBy,
    countBy,
    pluck,
    where,
    findWhere,
    invoke,
    pick,
    omit,
    defaults,
    clone,
    keys,
    values,
    pairs,
    invert,
    isMatch,
    isEmpty as isEmptyObject,
    isElement,
} from './objects';

export const VERSION = '1.0.0';

import * as collections from './collections';
import * as arrays from './arrays';
import * as objects from './objects';
import * as utils from './utils';

export default {
    ...collections,
    ...arrays,
    ...objects,
    ...utils,
    VERSION,
};
