import { gql } from '@apollo/client';


export const AUTH_LOGIN = gql`
  mutation AuthLogin($args: LoginInput!) {
    authLogin(args: $args)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation AuthChangePassword($args: ChangePasswordInput!) {
    authChangePassword(args: $args)
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation AuthForgotPassword($username: String!) {
    authForgotPassword(username: $username)
  }
`;

export const RESET_PASSWORD = gql`
  mutation AuthPasswordReset($args: PasswordResetInput!) {
    authPasswordReset(args: $args)
  }
`;