export interface IRegister {
  firstname: string;
  lastname: string;
  contact_no: string;
  password: string;
  confirm_password: string;
}

export interface ILogin {
  contact_no: string;
  password: string;
}

export interface IForgotPassword {
  contact_no: string;
}

export interface IOtpVerification {
  otp: string;
}

export interface IResetPassword {
  password: string;
  confirm_password: string;
}
