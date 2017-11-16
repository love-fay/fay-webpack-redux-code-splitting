/**
 * Created by feichongzheng on 17/9/26.
 */
import {createSelector} from 'reselect';

const getUumsApp = (state) => state.uumsApp;

export const selectVisibleAppPage = createSelector(
    [getUumsApp],
    (uumsApp) => uumsApp
);
