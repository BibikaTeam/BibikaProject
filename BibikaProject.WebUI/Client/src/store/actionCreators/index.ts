import * as AuthAction from "../../components/authorization/login/actions";
import * as BrandAction from "../../components/adminPanel/brand/service"

const actions = { ...AuthAction, ...BrandAction  };

export default actions;
