import getBasicTreeByParentUid from "../queries/getBasicTreeByParentUid";
import getPageUidByPageTitle from "../queries/getPageUidByPageTitle";
import getTokenFromTree from "./getTokenFromTree";
import localStorageGet from "./localStorageGet";

const getToken = (service = "roamjs"): string =>
  localStorageGet(`token${service === "roamjs" ? "" : `-${service}`}`) ||
  getTokenFromTree(
    getBasicTreeByParentUid(getPageUidByPageTitle(`roam/js/${service}`))
  );

export default getToken;
