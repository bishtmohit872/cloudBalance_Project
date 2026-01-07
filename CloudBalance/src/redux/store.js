import { createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension'

import { persistStore,persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'

const initialState = {
  loginUserInfo: {},
  breadCrumbs:["A. Create an IAM Role","B. Add customer Managed Policies","C. create CUR"],
  sideBarState:false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case "AddLoginUser":
      return {
        ...state,
        loginUserInfo: {
          ...state.loginUserInfo,
          ...action.payload
        }
      }
    case "RemoveLoginUser":
      return{
        ...state,
        loginUserInfo:{}
      }
    
    case "ChangeSideBarState":
      return {
        ...state,
        sideBarState:action.payload
      }

    default:
      return state;
  }
}

//action creator
export const addLoginUser = (data)=>{
  return {type:"AddLoginUser",payload:data}
}

export const removeLoginUser=()=>{
  return {type:"RemoveLoginUser"}
}

export const changeSideBarState=(data)=>{
  return {type:"ChangeSideBarState",payload:data}
}

const persistconfig={
  key:"root",
  storage
}

const persistedReducer = persistReducer(persistconfig,userReducer)

const store = createStore(persistedReducer,composeWithDevTools());

export const persistor = persistStore(store)

export default store;
