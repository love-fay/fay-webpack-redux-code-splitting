/**
 * Created by feichongzheng on 17/10/24.
 */
import {reducer as uumsReducer} from './route';
import {reducer as uumsAppReducer} from './app';
import {reducer as uumsOrgReducer} from './org';
import {reducer as uumsGroupReducer} from './group';
import {reducer as uumsPositionReducer} from './position';
import {reducer as uumsOrgRoleReducer} from './orgRole';
import {reducer as uumsUserReducer} from './user';
import {reducer as uumsRoleReducer} from './role';
import {reducer as uumsPersonReducer} from './person';
import {reducer as uumsMenuResourceReducer} from './menuResource';
import {reducer as uumsControllerResourceReducer} from './controllerResource';
import {reducer as uumsAuthReducer} from './resource/auth';
import {reducer as uumsAssignPersonReducer} from './assignPerson';
import {reducer as uumsUnassignPersonReducer} from './unassignPerson';
import {reducer as uumsUnifyManageReducer} from './unifyManage';
import {reducer as uumsUnifyOrgStructureReducer} from './unifyManage/orgStructure';
import {reducer as uumsUnifyResourceStructureReducer} from './unifyManage/resourceStructure';
import {reducer as uumsUnifyUnitInfoReducer} from './unifyManage/unitInfo';
import {reducer as uumsUnifyOrgReducer} from './unifyManage/org';
import {reducer as uumsUnifyGroupReducer} from './unifyManage/group';
import {reducer as uumsUnifyPositionReducer} from './unifyManage/position';
import {reducer as uumsUnifyOrgRoleReducer} from './unifyManage/orgRole';
import {reducer as uumsUnifyPersonReducer} from './unifyManage/person';
import {reducer as uumsUnifyAppReducer} from './unifyManage/app';
import {reducer as uumsUnifyMenuReducer} from './unifyManage/menuResource';
import {reducer as uumsUnifyControllerReducer} from './unifyManage/controllerResource';

export default {
    uums: uumsReducer,
    uumsApp: uumsAppReducer,
    uumsOrg: uumsOrgReducer,
    uumsGroup: uumsGroupReducer,
    uumsPosition: uumsPositionReducer,
    uumsOrgRole: uumsOrgRoleReducer,
    uumsUser: uumsUserReducer,
    uumsRole: uumsRoleReducer,
    uumsPerson: uumsPersonReducer,
    uumsMenuResource: uumsMenuResourceReducer,
    uumsControllerResource: uumsControllerResourceReducer,
    uumsAuth: uumsAuthReducer,
    uumsAssignPerson: uumsAssignPersonReducer,
    uumsUnAssignPerson: uumsUnassignPersonReducer,
    uumsUnifyManage: uumsUnifyManageReducer,
    uumsUnifyOrgStructure: uumsUnifyOrgStructureReducer,
    uumsUnifyResourceStructure: uumsUnifyResourceStructureReducer,
    uumsUnifyUnitInfo: uumsUnifyUnitInfoReducer,
    uumsUnifyOrg: uumsUnifyOrgReducer,
    uumsUnifyGroup: uumsUnifyGroupReducer,
    uumsUnifyPosition: uumsUnifyPositionReducer,
    uumsUnifyOrgRole: uumsUnifyOrgRoleReducer,
    uumsUnifyPerson: uumsUnifyPersonReducer,
    uumsUnifyApp: uumsUnifyAppReducer,
    uumsUnifyMenu: uumsUnifyMenuReducer,
    uumsUnifyController: uumsUnifyControllerReducer
};