import * as AuthAction from "../../components/authorization/login/actions";
import * as SearchAction from "../../components/posts/search/actions";

const actions = { ...AuthAction, ...SearchAction };

export default actions;
