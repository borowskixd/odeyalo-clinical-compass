export interface ChangePasswordRequestData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordApiRequestData {
  token: string;
  password: string;
  confirm_new_password: string;
}
