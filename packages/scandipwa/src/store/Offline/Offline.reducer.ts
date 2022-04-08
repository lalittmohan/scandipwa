/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */
import { Reducer } from 'redux';

import {
    SET_BIG_OFFLINE_NOTICE,
    SHOW_OFFLINE_NOTICE
} from './Offline.action';
import { OfflineAction, OfflineStore } from './type';

/** @namespace Store/Offline/Reducer/getInitialState */
export const getInitialState = (): OfflineStore => ({
    isOffline: true,
    isBig: false
});

/** @namespace Store/Offline/Reducer/OfflineReducer */
export const OfflineReducer: Reducer<
OfflineStore,
OfflineAction & OfflineStore
> = (
    state = getInitialState(),
    action
) => {
    switch (action.type) {
    case SHOW_OFFLINE_NOTICE:
        const { isOffline } = action;

        return {
            ...state,
            isOffline
        };
    case SET_BIG_OFFLINE_NOTICE:
        const { isBig } = action;

        return {
            ...state,
            isBig
        };
    default:
        return state;
    }
};

export default OfflineReducer;