const USER_MESSAGES = {
  USER_ALREADY_EXISTS:
    'Oops! Looks like a user with this email or phone number is already registered. Please use a different email or phone number to create a new account.',
  USERS_FOUND: 'Users found.',
  USERS_NOT_FOUND: 'No users found.',

  USERS_ADDED: 'Users successfully saved.',
  USERS_NOT_ADDED: 'Failed to save users.',
  USERS_ADD_REJECTED: 'Email address should be unique.',

  USER_UPDATED: 'User updated successfully.',
  USER_NOT_UPDATE: 'Failed to update user.',

  USER_DELETED: 'User deleted successfully.',
  USER_NOT_DELETE: 'Failed to delete user.',

  FIRST_NAME_REQUIRED: 'First name is required.',
  FIRST_NAME_MUST_BE_STRING: 'First name must be a valid text.',

  LAST_NAME_REQUIRED: 'Last name is required.',
  LAST_NAME_MUST_BE_STRING: 'Last name must be a valid text.',

  EMAIL_EXISTS: 'A user with the same email already exists.',
  EMAIL_REQUIRED: 'Email address is required.',
  EMAIL_NOT_EMPTY: 'Email address should not be empty.',
  EMAIL_INVALID: 'Please enter a valid email address.',
  EMAIL_UNIQUE: 'Email address must be unique.',
  EMAIL_ALREADY_EXISTS: 'An account already exists with the given email.',

  PASSWORD_MISMATCH: 'Password and confirm password do not match.',
  PASSWORD_REQUIRED: 'Password is required.',
  PASSWORD_MUST_BE_STRING: 'Password must be a valid text.',

  CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required.',
  CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm password must be a valid text.',

  PHONE_NUMBER_REQUIRED: 'Phone number is required.',
  PHONE_NUMBER_MUST_BE_STRING: 'Phone number must be a valid text.',
  PHONE_NUMBER_INVALID: 'Phone number must have at least 10 digits.',
  PHONE_NUMBER_INVALID_LENGTH: 'Phone number must have at most 10 digits.',

  PROFILE_IMAGE_MISSING: 'Please upload a profile image.',

  USER_DISABLE: 'User disable successfully.',
  USER_NOT_DISABLE: 'Failed to disable user.',

  ADMIN_PERMISSION: 'This resource is accessible only by admin users.',
};

module.exports = { USER_MESSAGES }