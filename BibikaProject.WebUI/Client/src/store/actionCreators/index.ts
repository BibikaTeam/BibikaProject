import * as AuthAction from "../../components/authorization/login/actions";
import * as BrandAction from "../../components/adminPanel/brand/service";
import * as SearchAction from "../../components/posts/search/actions";

const actions = { ...AuthAction, ...BrandAction, ...SearchAction };

export default actions;
