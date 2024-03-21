const AUTH_MESSAGES = {
  LOGIN_SUCCESSFUL: 'You have successfully logged in.',
  LOGIN_FAILED: 'Login failed. Please check your email and password.',

  LOGOUT_SUCCESSFUL: 'You have successfully logged out.',
  LOGOUT_FAILED: 'Logout failed. Please try again later.',

  USER_NOT_FOUND: 'User not found. Please register to continue.',
  LOGIN_UN_SUCCESSFUL_WITHOUT_PASSWORD:
    'Please set a password before logging in.',

  INVALID_EMAIL: 'Invalid email address. Please enter a valid email.',
  INVALID_PASSWORD:
    'Invalid password. Passwords should be at least 6 characters long.',

  URL_CORRECT: 'The link to reset your password is valid.',
  URL_EXPIRED:
    'The link to reset your password has expired. Please request a new link.',
  LINK_INCORRECT:
    'The link to reset your password is incorrect. Please make sure you copied it correctly.',

  INVITE_URL_CORRECT: 'The link to set your password is valid.',
  INVITE_URL_EXPIRED:
    'Your invitation code has expired. Please request a new one.',
  INVITE_LINK_INCORRECT:
    'The invitation code is incorrect. Please make sure you copied it correctly.',

  EMAIL_SENT:
    'Please check your email inbox for the link to change your password.',

  PASSWORD_RESET_SUCCESSFULLY: 'Your password has been reset successfully.',
  PASSWORD_RESET_UN_SUCCESSFULLY:
    'Unable to reset your password. Please try again later.',
  CURRENT_PASSWORD_INVALID: 'The current password you entered is invalid.',

  INITIAL_PASSWORD_SETUP_SUCCESS:
    'Password setup successful. You can now log in.',
  INITIAL_PASSWORD_SETUP_ERROR:
    'Password setup unsuccessful. Please try again.',

  PASSWORD_CHANGE_SUCCESSFULLY: 'Password changed successfully.',
  PASSWORD_CHANGE_UN_SUCCESSFULLY:
    'Unable to update your password. Please try again.',
  PASSWORD_MISMATCH: 'The new password and confirm password do not match.',

  EMAIL_ERROR_MISSING: 'Email address is missing. Please enter your email.',
  EMAIL_ERROR_EMPTY: 'Email address is empty. Please enter your email.',
  EMAIL_ERROR_INVALID: 'Invalid email address. Please enter a valid email.',
  EMAIL_UNIQUE: 'Email address must be unique. Please use a different email.',
  EMAIL_REQUIRED: 'Email address is required. Please enter your email.',

  NAME_MISSING: 'Name is missing. Please enter your name.',
  NAME_EMPTY: 'Name is empty. Please enter your name.',

  PASSWORD_ERROR_MISSING: 'Password is missing. Please enter your password.',
  PASSWORD_ERROR_EMPTY: 'Password is empty. Please enter your password.',
  PASSWORD_MUST_BE_STRING:
    'Password must be a string. Please enter a valid password.',

  PASSWORD_LENGTH: 'Password must be at least 6 characters long.',
  IN_VALID_PASSWORD_TYPE:
    'Password must contain at least 1 digit, 1 uppercase letter, 1 special character, and be between 6 to 15 characters long.',

  OLD_PASSWORD_REQUIRED: 'Please enter your old password.',
  NEW_PASSWORD_REQUIRED: 'Please enter your new password.',

  CONFIRM_PASSWORD:
    'Confirm Password field is required. Please confirm your password.',
  IN_VALID_CONFIRM_PASSWORD:
    'Confirm password does not match with the password. Please make sure they are the same.',

  TOKEN_INVALID:
    'Your reset password token is invalid. Please enter a valid token.',
  TOKEN_REQUIRED:
    'Reset password Token is required. Please enter a valid token.',

  MISSING_ACCESS_TOKEN:
    'Access token is required. Please provide a valid access token.',

  INVALID_CREDENTIAL:
    'Invalid credentials. Please check your email and password.',
};


module.exports = { AUTH_MESSAGES }