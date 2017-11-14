/**
 * Created by feichongzheng on 17/6/29.
 */

/**
 * 判断指定的路径是否有访问的权限
 * @param {String} path -指定的路径
 * @returns {boolean} -true：有权限，false：无权限
 */
function right (path) {
    let isControlled = JSON.parse(window.localStorage.getItem('isControlled'));
    let controller = JSON.parse(window.localStorage.getItem('controller'));
    let isControlledFlag = false;
    let isControlleFlag = false;
    if (isControlled) {
        for (let i in isControlled) {
            if (isControlled.hasOwnProperty(i)) {
                let r = isControlled[i];
                if (r.url === path) {
                    isControlledFlag = true;
                    break;
                }
            }
        }
        if (isControlledFlag) {
            if (controller) {
                for (let i in controller) {
                    if (controller.hasOwnProperty(i)) {
                        let r = controller[i];
                        if (r.url === path) {
                            isControlleFlag = true;
                            break;
                        }
                    }
                }
            }
            return isControlleFlag;
        }
        return true;
    }
    return false;
}

let Storage = {
    right: right,
};

export default Storage;
