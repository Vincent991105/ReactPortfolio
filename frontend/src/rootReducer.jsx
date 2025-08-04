import { combineReducers } from "redux";
import ProjectBridgeDataSlice from "./website/store/bridgeSlice";

const appReducer = combineReducers({
  ProjectBridgeData: ProjectBridgeDataSlice,
});

const rootReducer = (state, action) => {
  // if (action.type === loginUser.pending.type) {
  //   state = undefined; // 重置所有 state 為初始值
  // }
  return appReducer(state, action);
};

export default rootReducer;
