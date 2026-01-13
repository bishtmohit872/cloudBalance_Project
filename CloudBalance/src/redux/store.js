import { createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension'

import { persistStore,persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { options } from "fusioncharts";

const initialState = {
  loginUserInfo: {},
  breadCrumbs:["A. Create an IAM Role","B. Add customer Managed Policies","C. create CUR"],
  sideBarState:false,
  Options : [
  ["Service", "Service"],
  ["Instance Type", "INSTANCE_TYPE"],
  ["Account ID", "ACCOUNT_ID"],
  ["Usage Type", "USAGE_TYPE"],
  ["Platform", "PLATFORM"],
  ["Region", "REGION"],
  ["Usage Type Group", "USAGE_TYPE_GROUP"],
  [
    "More",
    [
      ["Purchase Option", "PURCHASE_OPTION"],
      ["API Operation", "API_OPERATION"],
      ["Resource", "RESOURCE"],
      ["Availabilityzone", "AVAILABILITY_ZONE"],
      ["Tenancy", "TENANCY"],
      ["Legal Entity", "LEGAL_ENTITY"],
      ["Billing Entity", "BILLING_ENTITY"]
    ]
  ]
]


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
    
    case "setActiveOption":
      return{
        ...state,
        Options:action.payload
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

export const setActiveOption=(data)=>{
  return {type:"setActiveOption",payload:data}
}

const persistconfig={
  key:"root",
  storage
}

const persistedReducer = persistReducer(persistconfig,userReducer)

const store = createStore(persistedReducer,composeWithDevTools());

export const persistor = persistStore(store)

export default store;
