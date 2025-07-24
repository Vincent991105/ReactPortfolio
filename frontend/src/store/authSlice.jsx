import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../service/authService';

// 定義異步登入 action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // const response = await authService.login(userData);

      // if (response.data.success) {
      //   const groupResponse = await authService.groupLink();
      //   await authService.refreshToken();
      //   sessionStorage.setItem("groupLink", groupResponse.data.data.group);
      //   return groupResponse.data.data.group;
      // } else {
      //   return rejectWithValue('登入失敗');
      // }

      if (userData.userName === 'vincent' && userData.password === '991105010119') {
        return { groupLink: 'admin' }; // 模擬成功登入並設定 admin 角色
      } else if(userData.userName === 'admin' && userData.password === '9090123'){
         return { groupLink: 'admin' };
      } else {
        return rejectWithValue('密碼錯誤；請勿登入系統後台'); // 模擬登入失敗
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || '登入失敗');
    }
  }
);

// export const logoutUser = createAsyncThunk(
//   'auth/logoutUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       await authService.logout();
//       sessionStorage.removeItem("groupLink");
//       return true;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || '登出失敗');
//     }
//   }
// );

// export const refreshUser = createAsyncThunk(
//   'auth/refreshUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await authService.refreshToken();
//       if (response.data.response === 'Successful') {
//         return true; // 刷新成功
//       } else {
//         return rejectWithValue('Token 刷新失敗'); // 讓 rejected 捕捉
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || '登出失敗');
//     }
//   }
// );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    groupLink: null,
    tokenSave: null,
    refreshTime: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.groupLink = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refreshTime = new Date().toISOString(); // 記錄刷新時間
        state.groupLink = action.payload.groupLink; // 修正 groupType -> groupLink
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.groupLink = null;
      //   state.refreshTime = null;
      //   sessionStorage.removeItem("groupLink");
      // })
      // .addCase(logoutUser.rejected, (state, action) => {
      //   state.error = action.payload;
      // })
      // .addCase(refreshUser.pending, (state) => {
      //   state.tokenSave = null;
      //   state.error = null;
      // })
      // .addCase(refreshUser.fulfilled, (state, action) => {
      //   state.tokenSave = action.payload;
      //   state.refreshTime = new Date().toISOString(); // 記錄刷新時間
      // })
      // .addCase(refreshUser.rejected, (state, action) => {
      //   state.groupLink = null; // 刷新失敗時清除 groupLink
      //   sessionStorage.removeItem("groupLink");
      //   state.error = action.payload;
      // });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
