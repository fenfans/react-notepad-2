// TODO: 接后台权限管理，临时写死
const ADMINS = ['huangxing'];

export default {
  isAdmin: function(userLogin) {
    let result = false;
    if (userLogin) {
      userLogin = userLogin.toLowerCase();
      result = ADMINS.indexOf(userLogin) !== -1
    }
    return result
  }
}