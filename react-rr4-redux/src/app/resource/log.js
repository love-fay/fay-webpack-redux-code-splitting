import {api} from '../uums/resource';

const saveInterface = (accessPath, opDesc, execTime, status) => {
    try{
        const menuPath = window.location.pathname;
        api.log.saveInterface({menuPath, accessPath, opDesc, execTime, status});
    }catch(err){
        (process.env.NODE_ENV === 'development') && console.log(err);
    }
};

const saveAction = (accessPath, opDesc, execTime, status) => {
    try {
        const menuPath = window.location.pathname;
        api.log.saveAction({menuPath, accessPath, opDesc, execTime, status});
    }catch(err){
        (process.env.NODE_ENV === 'development') && console.log(err);
    }
};

const log = {
    saveInterface,
    saveAction
};

export default log;