import { combineReducers } from "redux";

const appReducer = combineReducers({
});

const rootReducer = (state, action) => {
  // if (action.type === loginUser.pending.type) {
  //   state = undefined; // 重置所有 state 為初始值
  // }
  return appReducer(state, action);
};

export default rootReducer;
