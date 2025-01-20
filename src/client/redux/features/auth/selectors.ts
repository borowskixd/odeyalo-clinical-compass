import { type RootState } from "../../store";
import { type AccessRole } from "@/shared/config/access";
import { MOBILE_DEVICE_TYPES } from "@/shared/data";

const selectAuthModule = (state: RootState) => {
  return state.authReducer;
};

export const selectAuth = (state: RootState) => {
  return selectAuthModule(state);
};

export const selectIsAuth = (state: RootState): boolean => {
  return selectAuthModule(state).isAuth;
};

export const selectProfile = (state: RootState) => {
  return selectAuthModule(state).profile;
};

export const selectRole = (state: RootState): AccessRole => {
  return selectAuthModule(state).profile.role;
};

export const selectIsMobile = (state: RootState): boolean => {
  const deviceType = selectAuthModule(state).ua.device.type;

  const isMobile = !!deviceType && MOBILE_DEVICE_TYPES.includes(deviceType);

  return isMobile;
};
