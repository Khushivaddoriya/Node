const PERMISSION_MESSAGES = {
  PERMISSION_ADD_SUCCESS: 'Permission added successfully.',
  PERMISSION_ADD_ERROR:
    'An error occurred while adding the permission. Please try again.',

  PERMISSION_UPDATE_SUCCESS: 'Permission updated successfully.',
  PERMISSION_UPDATE_ERROR:
    'Failed to update the permission. Please check your inputs and try again.',

  PERMISSION_DELETE_SUCCESS: 'Permission deleted successfully.',
  PERMISSION_DELETE_ERROR:
    'Permission deletion failed. Please ensure the permission exists and try again.',

  PERMISSION_FOUND_SUCCESS: 'Permission found successfully.',
  PERMISSION_FOUND_ERROR:
    'Permission not found. Please verify the permission details and try again.',

  PERMISSION_NAME_REQUIRED: 'Permission name required.',
  PERMISSION_ALREADY_EXISTS:'Permission with the same name already exists.'
};

module.exports = { PERMISSION_MESSAGES }