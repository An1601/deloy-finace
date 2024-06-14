import { SurveyAnsType } from "./enum";

export type SignUpInfo = {
  fullname: string;
  phone?: string;
  email: string;
  DOB: string;
  address: string;
  password: string;
  password_confirmation: string;
  policy_agreement: boolean;
};

export type BusinessProfile = {
  name: string;
  email: string;
  phone: string;
  DOB: string;
  business_address: string;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type ResetPasswordInfo = {
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  email_verified_at: string;
  verified_code: string;
  expired_code: string;
  created_at: string;
  updated_at: string;
  access_token: string;
  refresh_token: string;
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  address: string;
  email_verified_at: string;
  access_token: string;
  refresh_token: string;
  business_profile: BusinessProfile | null;
  check_submit?: boolean;
};

export type LoanCategory = {
  id: number;
  name: string;
  thumbnail: string;
};

export type LoanListItemType = {
  id: number;
  loan_name: string;
  origination_fee: number;
  rate_month: number;
  credit_limit: number;
  state?: number;
  bank: {
    name: string;
  };
  bank_thumbnail: string;
  time_began: Date;
  project: {
    name: string;
  };
};

export type LoanDetailProcessType = {
  id: number;
  name: string;
  category_id: string;
  interest_rate_type: string;
  type: number;
  origination_fee: string;
  interest_rate: string;
  duration: string;
  credit_limit: string;
  description: string;
  time_began: string;
  category: {};
  bank: {
    name: string;
  };
};

export type UpdateProfile = {
  name: string;
  phone: string;
  DOB: string;
  business_address: string;
  email: string;
};

export type ChangePasswordInfo = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export type Message = {
  avatar: string;
  sender?: string;
  content: string;
  time: string;
  type: "sent" | "received";
};

export type ChatData = {
  id: number;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastMessageTime: string;
  lastMessageStatus: string;
  isOnline: boolean;
  messages: Message[];
};

export type SurveyQuestion = {
  id: string;
  content?: string;
  label?: string;
  type: SurveyAnsType;
  choice: Array<string>;
  subQuestions?: Array<SurveyQuestion>;
};

export type Loan = {
  id: number;
  bank_id: number;
  name: string;
  type: number;
  category_id: number;
  credit_limit: number;
  interest_rate: number;
  interest_rate_type: number;
};

export type Meeting = {
  id: number;
  loan_business_list_id: number;
  date_meeting: string;
  start_time: string;
  end_time: string;
  zoom_meeting: string;
};
export type ConsultingMeeting = {
  id: number;
  business_id: number;
  loan_id: number;
  time_submit: string;
  state: number;
  meeting: Meeting;
  loan: Loan;
};
