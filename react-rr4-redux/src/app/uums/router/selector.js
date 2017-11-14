/**
 * Created by feichongzheng on 17/9/26.
 */
import {createSelector} from 'reselect';

const getUums = (state) => state.uums;

export const selectVisibleUums = createSelector(
    [getUums],
    (uums) => uums
);
