const getDateWithDiff = (diff) => {
    const currentDateTime = new Date().getTime();
    const newDateTime = currentDateTime + diff;
    return new Date(newDateTime);
};

function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

const getDayStartDateWithDiff = (diff) => {
    const startDate = getDateWithDiff(diff);
    return new Date(startDate.getFullYear() + '-' + fix((startDate.getMonth()+1), 2) + '-' + fix(startDate.getDate(), 2) + 'T00:00:00');
};

const getDayEndDateWithDiff = (diff) => {
    const currentDateTime = new Date().getTime();
    const newDateTime = currentDateTime + diff;
    const endDate = new Date(newDateTime);
    return new Date(endDate.getFullYear() + '-' + fix((endDate.getMonth()+1), 2) + '-' + fix(endDate.getDate(), 2) + 'T23:59:59');
};

const getTodayStartDate = () => {
    const today = new Date();
    return new Date(today.getFullYear() + '-' + fix((today.getMonth()+1), 2) + '-' + fix(today.getDate(), 2) + 'T00:00:00');
};

const getTodayEndDate = () => {
    const today = new Date();
    return new Date(today.getFullYear() + '-' + fix((today.getMonth()+1), 2) + '-' + fix(today.getDate(), 2) + 'T23:59:59');
};

export {getDateWithDiff, getDayStartDateWithDiff, getDayEndDateWithDiff, getTodayEndDate, getTodayStartDate};