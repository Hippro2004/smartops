String messageFor(String code) {
  switch (code) {
    case "USERNAME_TAKEN":
      return "This username is already in use.";
    case 'EMAIL_TAKEN':
      return 'This email address is already in use.';
    case 'INVALID_CREDENTIALS':
      return 'The username or password is incorrect.';
    case 'INVALID_CURRENT_PASSWORD':
      return 'The current password is incorrect.';
    case 'CONTACT_TAKEN':
      return 'This contact number is already in use.';
    case 'VALIDATION_FAILED':
      return 'Invalid information. Please check your entries.';
    case 'NETWORK_ERROR':
      return 'Unable to connect to the server.';
    default:
      return "Something went wrong. Please try again later.";
  }
}
