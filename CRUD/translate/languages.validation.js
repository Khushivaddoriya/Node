const languages = {
  en: {
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
    EMAIL_NOT_EMPTY: 'Email address should not be empty.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    EMAIL_ALREADY_EXISTS: 'An account already exists with the given email.',
    PASSWORD_REQUIRED: 'Password is required.',
    CONFIRM_PASSWORD_REQUIRED: 'Confirm password is required.',
    CONFIRM_PASSWORD_MUST_BE_STRING: 'Confirm password must be a valid text.',
    PHONE_NUMBER_REQUIRED: 'Phone number is required.',
    PHONE_NUMBER_MUST_BE_STRING: 'Phone number must be a valid text.',
    PHONE_NUMBER_INVALID: 'Phone number must have at least 10 digits.',
    PHONE_NUMBER_INVALID_LENGTH: 'Phone number must have at most 10 digits.',
    PROFILE_IMAGE_MISSING: 'Please upload a profile image.',
    PAYMENT_INTENT_CREATED: 'Payment intent successfully created.',
    PAYMENT_INTENT_NOT_CREATED:
      'Failed to create payment intent. Please try again.',
    AMOUNT_REQUIRED: 'Please provide the payment amount.',
    CURRENCY_REQUIRED: 'Please specify the currency for the payment.',
    CURRENCY_MUST_BE_STRING: 'Currency must be a valid string.',
    PAYMENT_CREATED: 'Successfully initiated payment using PayPal method',
    PAYMENT_EXECUTE: 'Payment executed successfully using PayPal method',
    PLAN_AMOUNT_REQUIRED: 'Amount is required for creating a plan.',
    PLAN_CURRENCY_REQUIRED: 'Currency is required for creating a plan.',
    PLAN_NAME_REQUIRED: 'Plan name is required for creating a plan.',
    PLAN_TYPE_REQUIRED: 'Plan type is required for creating a plan.',
    PLAN_LIMIT_REQUIRED: 'Plan limit is required for creating a plan.',
    PLAN_FEATURE_NAME_REQUIRED:
      'Plan feature name is required for creating a plan feature.',
    FREE_PLAN_PURCHASE: "Successfully purchase free plan.",
    FREE_PLAN_NOT_PURCHASE: "Free plan not purchase. Please try again.",

    PERMISSION_NAME_REQUIRED: 'Permission name required.',
    PERMISSION_ALREADY_EXISTS:'Permission with the same name already exists.'
  },

  es: {
    LOGIN_SUCCESSFUL: 'Has iniciado sesión exitosamente.',
    LOGIN_FAILED:
      'Inicio de sesión fallido. Por favor verifica tu correo electrónico y contraseña.',
    LOGOUT_SUCCESSFUL: 'Has cerrado sesión exitosamente.',
    LOGOUT_FAILED:
      'Error al cerrar sesión. Por favor inténtalo nuevamente más tarde.',
    USER_NOT_FOUND:
      'Usuario no encontrado. Por favor regístrate para continuar.',
    LOGIN_UN_SUCCESSFUL_WITHOUT_PASSWORD:
      'Por favor establece una contraseña antes de iniciar sesión.',
    INVALID_EMAIL:
      'Dirección de correo electrónico no válida. Por favor ingresa un correo válido.',
    INVALID_PASSWORD:
      'Contraseña no válida. Las contraseñas deben tener al menos 6 caracteres de longitud.',
    URL_CORRECT: 'El enlace para restablecer tu contraseña es válido.',
    URL_EXPIRED:
      'El enlace para restablecer tu contraseña ha expirado. Por favor solicita un nuevo enlace.',
    LINK_INCORRECT:
      'El enlace para restablecer tu contraseña es incorrecto. Por favor asegúrate de copiarlo correctamente.',
    INVITE_URL_CORRECT: 'El enlace para configurar tu contraseña es válido.',
    INVITE_URL_EXPIRED:
      'Tu código de invitación ha expirado. Por favor solicita uno nuevo.',
    INVITE_LINK_INCORRECT:
      'El código de invitación es incorrecto. Por favor asegúrate de copiarlo correctamente.',
    EMAIL_SENT:
      'Por favor revisa tu bandeja de entrada de correo electrónico para el enlace para cambiar tu contraseña.',
    PASSWORD_RESET_SUCCESSFULLY:
      'Tu contraseña ha sido restablecida exitosamente.',
    PASSWORD_RESET_UN_SUCCESSFULLY:
      'No se pudo restablecer tu contraseña. Por favor inténtalo nuevamente más tarde.',
    CURRENT_PASSWORD_INVALID:
      'La contraseña actual que ingresaste no es válida.',
    INITIAL_PASSWORD_SETUP_SUCCESS:
      'Configuración de contraseña exitosa. Ahora puedes iniciar sesión.',
    INITIAL_PASSWORD_SETUP_ERROR:
      'Configuración de contraseña fallida. Por favor inténtalo nuevamente.',
    PASSWORD_CHANGE_SUCCESSFULLY: 'Contraseña cambiada exitosamente.',
    PASSWORD_CHANGE_UN_SUCCESSFULLY:
      'No se pudo actualizar tu contraseña. Por favor inténtalo nuevamente.',
    PASSWORD_MISMATCH:
      'La nueva contraseña y la confirmación de contraseña no coinciden.',
    EMAIL_ERROR_MISSING:
      'Falta la dirección de correo electrónico. Por favor ingresa tu correo electrónico.',
    EMAIL_ERROR_EMPTY:
      'La dirección de correo electrónico está vacía. Por favor ingresa tu correo electrónico.',
    EMAIL_ERROR_INVALID:
      'Dirección de correo electrónico no válida. Por favor ingresa un correo válido.',
    EMAIL_UNIQUE:
      'La dirección de correo electrónico debe ser única. Por favor utiliza una dirección de correo diferente.',
    EMAIL_REQUIRED:
      'La dirección de correo electrónico es requerida. Por favor ingresa tu correo electrónico.',
    NAME_MISSING: 'Falta el nombre. Por favor ingresa tu nombre.',
    NAME_EMPTY: 'El nombre está vacío. Por favor ingresa tu nombre.',
    PASSWORD_ERROR_MISSING:
      'Falta la contraseña. Por favor ingresa tu contraseña.',
    PASSWORD_ERROR_EMPTY:
      'La contraseña está vacía. Por favor ingresa tu contraseña.',
    PASSWORD_MUST_BE_STRING:
      'La contraseña debe ser un texto válido. Por favor ingresa una contraseña válida.',
    PASSWORD_LENGTH: 'La contraseña debe tener al menos 6 caracteres.',
    IN_VALID_PASSWORD_TYPE:
      'La contraseña debe contener al menos 1 dígito, 1 letra en mayúscula, 1 carácter especial, y tener entre 6 y 15 caracteres de longitud.',
    OLD_PASSWORD_REQUIRED: 'Por favor ingresa tu contraseña actual.',
    NEW_PASSWORD_REQUIRED: 'Por favor ingresa tu nueva contraseña.',
    CONFIRM_PASSWORD:
      'El campo de confirmación de contraseña es requerido. Por favor confirma tu contraseña.',
    IN_VALID_CONFIRM_PASSWORD:
      'La contraseña de confirmación no coincide con la contraseña. Por favor asegúrate de que sean iguales.',
    TOKEN_INVALID:
      'Tu token para restablecer la contraseña no es válido. Por favor ingresa un token válido.',
    TOKEN_REQUIRED:
      'Se requiere un token para restablecer la contraseña. Por favor ingresa un token válido.',
    MISSING_ACCESS_TOKEN:
      'Se requiere un token de acceso. Por favor proporciona un token válido.',
    INVALID_CREDENTIAL:
      'Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.',
    USER_ALREADY_EXISTS:
      '¡Ups! Parece que ya hay un usuario registrado con este correo electrónico o número de teléfono. Por favor, utiliza un correo electrónico o número de teléfono diferente para crear una nueva cuenta.',
    USERS_FOUND: 'Usuarios encontrados.',
    USERS_NOT_FOUND: 'No se encontraron usuarios.',
    USERS_ADDED: 'Usuarios guardados exitosamente.',
    USERS_NOT_ADDED: 'No se pudieron guardar los usuarios.',
    USERS_ADD_REJECTED: 'El correo electrónico de los usuarios debe ser único.',
    USER_UPDATED: 'Usuario actualizado exitosamente.',
    USER_NOT_UPDATE: 'No se pudo actualizar el usuario.',
    USER_DELETED: 'Usuario eliminado exitosamente.',
    USER_NOT_DELETE: 'No se pudo eliminar el usuario.',
    FIRST_NAME_REQUIRED: 'Se requiere el nombre.',
    FIRST_NAME_MUST_BE_STRING: 'El nombre debe ser un texto válido.',
    LAST_NAME_REQUIRED: 'Se requiere el apellido.',
    LAST_NAME_MUST_BE_STRING: 'El apellido debe ser un texto válido.',
    EMAIL_EXISTS: 'Ya existe un usuario con el mismo correo electrónico.',
    EMAIL_NOT_EMPTY: 'El correo electrónico no debe estar vacío.',
    EMAIL_INVALID: 'Por favor ingresa un correo electrónico válido.',
    EMAIL_ALREADY_EXISTS:
      'Ya existe una cuenta con el correo electrónico proporcionado.',
    PASSWORD_REQUIRED: 'Se requiere una contraseña.',
    CONFIRM_PASSWORD_REQUIRED: 'Se requiere la confirmación de contraseña.',
    CONFIRM_PASSWORD_MUST_BE_STRING:
      'La confirmación de contraseña debe ser un texto válido.',
    PHONE_NUMBER_REQUIRED: 'Se requiere el número de teléfono.',
    PHONE_NUMBER_MUST_BE_STRING:
      'El número de teléfono debe ser un texto válido.',
    PHONE_NUMBER_INVALID:
      'El número de teléfono debe tener al menos 10 dígitos.',
    PHONE_NUMBER_INVALID_LENGTH:
      'El número de teléfono debe tener como máximo 10 dígitos.',
    PROFILE_IMAGE_MISSING: 'Por favor, sube una imagen de perfil.',
    PAYMENT_INTENT_CREATED: 'Pago registrado exitosamente.',
    PAYMENT_INTENT_NOT_CREATED:
      'Error al crear el intento de pago. Por favor, inténtelo nuevamente.',
    AMOUNT_REQUIRED: 'Por favor, indique el monto del pago.',
    CURRENCY_REQUIRED: 'Por favor, especifique la moneda para el pago.',
    CURRENCY_MUST_BE_STRING: 'La moneda debe ser una cadena válida.',
    PAYMENT_CREATED: 'Pago iniciado con éxito utilizando el método de PayPal',
    PAYMENT_EXECUTE:
      'Pago ejecutado exitosamente utilizando el método de PayPal',
    PLAN_AMOUNT_REQUIRED: 'Se requiere el monto para crear un plan.',
    PLAN_CURRENCY_REQUIRED: 'Se requiere la moneda para crear un plan.',
    PLAN_NAME_REQUIRED: 'Se requiere el nombre del plan para crear un plan.',
    PLAN_TYPE_REQUIRED: 'Se requiere el tipo de plan para crear un plan.',
    PLAN_LIMIT_REQUIRED: 'Se requiere el límite del plan para crear un plan.',
    PLAN_FEATURE_NAME_REQUIRED:
      'Se requiere el nombre de la característica del plan para crear una característica de plan.',

    FREE_PLAN_PURCHASE: "Compra exitosa del plan gratuito.",
    FREE_PLAN_NOT_PURCHASE: "Plan gratuito sin compra. Inténtalo de nuevo.",

    PERMISSION_NAME_REQUIRED: 'Nombre de permiso requerido.',
    PERMISSION_ALREADY_EXISTS:'El permiso con el mismo nombre ya existe'
  },

  fr: {
    LOGIN_SUCCESSFUL: 'Vous avez réussi à vous connecter.',
    LOGIN_FAILED:
      'Échec de la connexion. Veuillez vérifier votre adresse e-mail et votre mot de passe.',
    LOGOUT_SUCCESSFUL: 'Vous vous êtes déconnecté avec succès.',
    LOGOUT_FAILED:
      'Échec de la déconnexion. Veuillez réessayer ultérieurement.',
    USER_NOT_FOUND:
      'Utilisateur introuvable. Veuillez vous inscrire pour continuer.',
    LOGIN_UN_SUCCESSFUL_WITHOUT_PASSWORD:
      'Veuillez définir un mot de passe avant de vous connecter.',
    INVALID_EMAIL:
      'Adresse e-mail invalide. Veuillez entrer une adresse e-mail valide.',
    INVALID_PASSWORD:
      'Mot de passe invalide. Les mots de passe doivent comporter au moins 6 caractères.',
    URL_CORRECT: 'Le lien pour réinitialiser votre mot de passe est valide.',
    URL_EXPIRED:
      'Le lien pour réinitialiser votre mot de passe a expiré. Veuillez demander un nouveau lien.',
    LINK_INCORRECT:
      "Le lien pour réinitialiser votre mot de passe est incorrect. Assurez-vous de l'avoir copié correctement.",
    INVITE_URL_CORRECT: 'Le lien pour définir votre mot de passe est valide.',
    INVITE_URL_EXPIRED:
      "Votre code d'invitation a expiré. Veuillez en demander un nouveau.",
    INVITE_LINK_INCORRECT:
      "Le code d'invitation est incorrect. Assurez-vous de l'avoir copié correctement.",
    EMAIL_SENT:
      'Veuillez vérifier votre boîte de réception e-mail pour le lien permettant de changer votre mot de passe.',
    PASSWORD_RESET_SUCCESSFULLY:
      'Votre mot de passe a été réinitialisé avec succès.',
    PASSWORD_RESET_UN_SUCCESSFULLY:
      'Impossible de réinitialiser votre mot de passe. Veuillez réessayer ultérieurement.',
    CURRENT_PASSWORD_INVALID:
      'Le mot de passe actuel que vous avez saisi est invalide.',
    INITIAL_PASSWORD_SETUP_SUCCESS:
      'Configuration du mot de passe réussie. Vous pouvez maintenant vous connecter.',
    INITIAL_PASSWORD_SETUP_ERROR:
      'Échec de la configuration du mot de passe. Veuillez réessayer.',
    PASSWORD_CHANGE_SUCCESSFULLY: 'Mot de passe modifié avec succès.',
    PASSWORD_CHANGE_UN_SUCCESSFULLY:
      'Impossible de mettre à jour votre mot de passe. Veuillez réessayer.',
    PASSWORD_MISMATCH:
      'Le nouveau mot de passe et la confirmation du mot de passe ne correspondent pas.',
    EMAIL_ERROR_MISSING:
      'Adresse e-mail manquante. Veuillez entrer votre adresse e-mail.',
    EMAIL_ERROR_EMPTY:
      "L'adresse e-mail est vide. Veuillez entrer votre adresse e-mail.",
    EMAIL_ERROR_INVALID:
      'Adresse e-mail invalide. Veuillez entrer une adresse e-mail valide.',
    EMAIL_UNIQUE:
      "L'adresse e-mail doit être unique. Veuillez utiliser une adresse e-mail différente.",
    EMAIL_REQUIRED:
      "L'adresse e-mail est requise. Veuillez entrer votre adresse e-mail.",
    NAME_MISSING: 'Le nom est manquant. Veuillez entrer votre nom.',
    NAME_EMPTY: 'Le nom est vide. Veuillez entrer votre nom.',
    PASSWORD_ERROR_MISSING:
      'Le mot de passe est manquant. Veuillez entrer votre mot de passe.',
    PASSWORD_ERROR_EMPTY:
      'Le mot de passe est vide. Veuillez entrer votre mot de passe.',
    PASSWORD_MUST_BE_STRING:
      'Le mot de passe doit être une chaîne de caractères. Veuillez entrer un mot de passe valide.',
    PASSWORD_LENGTH: 'Le mot de passe doit comporter au moins 6 caractères.',
    IN_VALID_PASSWORD_TYPE:
      'Le mot de passe doit contenir au moins 1 chiffre, 1 lettre majuscule, 1 caractère spécial, et doit avoir entre 6 et 15 caractères.',
    OLD_PASSWORD_REQUIRED: 'Veuillez entrer votre ancien mot de passe.',
    NEW_PASSWORD_REQUIRED: 'Veuillez entrer votre nouveau mot de passe.',
    CONFIRM_PASSWORD:
      'Le champ de confirmation du mot de passe est requis. Veuillez confirmer votre mot de passe.',
    IN_VALID_CONFIRM_PASSWORD:
      "Le mot de passe de confirmation ne correspond pas au mot de passe. Veuillez vous assurer qu'ils sont identiques.",
    TOKEN_INVALID:
      "Votre jeton de réinitialisation de mot de passe n'est pas valide. Veuillez entrer un jeton valide.",
    TOKEN_REQUIRED:
      'Le jeton de réinitialisation du mot de passe est requis. Veuillez entrer un jeton valide.',
    MISSING_ACCESS_TOKEN:
      "Le jeton d'accès est requis. Veuillez fournir un jeton d'accès valide.",
    INVALID_CREDENTIAL:
      'Identifiants invalides. Veuillez vérifier votre adresse e-mail et votre mot de passe.',
    USER_ALREADY_EXISTS:
      'Oups ! Il semble quun utilisateur avec cette adresse e-mail ou ce numéro de téléphone soit déjà enregistré. Veuillez utiliser une adresse e-mail ou un numéro de téléphone différent pour créer un nouveau compte.',
    USERS_FOUND: 'Utilisateurs trouvés.',
    USERS_NOT_FOUND: 'Aucun utilisateur trouvé.',
    USERS_ADDED: 'Utilisateurs enregistrés avec succès.',
    USERS_NOT_ADDED: "Échec de l'enregistrement des utilisateurs.",
    USERS_ADD_REJECTED: "L'adresse e-mail doit être unique.",
    USER_UPDATED: 'Utilisateur mis à jour avec succès.',
    USER_NOT_UPDATE: "Échec de la mise à jour de l'utilisateur.",
    USER_DELETED: 'Utilisateur supprimé avec succès.',
    USER_NOT_DELETE: "Échec de la suppression de l'utilisateur.",
    FIRST_NAME_REQUIRED: 'Le prénom est requis.',
    FIRST_NAME_MUST_BE_STRING: 'Le prénom doit être un texte valide.',
    LAST_NAME_REQUIRED: 'Le nom de famille est requis.',
    LAST_NAME_MUST_BE_STRING: 'Le nom de famille doit être un texte valide.',
    EMAIL_EXISTS: 'Un utilisateur avec la même adresse e-mail existe déjà.',
    EMAIL_NOT_EMPTY: "L'adresse e-mail ne doit pas être vide.",
    EMAIL_INVALID: 'Veuillez saisir une adresse e-mail valide.',
    EMAIL_ALREADY_EXISTS:
      "Un compte existe déjà avec l'adresse e-mail fournie.",
    PASSWORD_REQUIRED: 'Le mot de passe est requis.',
    CONFIRM_PASSWORD_REQUIRED: 'La confirmation du mot de passe est requise.',
    CONFIRM_PASSWORD_MUST_BE_STRING:
      'La confirmation du mot de passe doit être un texte valide.',
    PHONE_NUMBER_REQUIRED: 'Le numéro de téléphone est requis.',
    PHONE_NUMBER_MUST_BE_STRING:
      'Le numéro de téléphone doit être un texte valide.',
    PHONE_NUMBER_INVALID:
      'Le numéro de téléphone doit comporter au moins 10 chiffres.',
    PHONE_NUMBER_INVALID_LENGTH:
      'Le numéro de téléphone ne doit pas comporter plus de 10 chiffres.',
    PROFILE_IMAGE_MISSING: 'Veuillez télécharger une image de profil.',
    PAYMENT_INTENT_CREATED: 'Intention de paiement créée avec succès.',
    PAYMENT_INTENT_NOT_CREATED:
      'Échec de la création de lintention de paiement. Veuillez réessayer.',
    AMOUNT_REQUIRED: 'Veuillez fournir le montant du paiement.',
    CURRENCY_REQUIRED: 'Veuillez spécifier la devise du paiement.',
    CURRENCY_MUST_BE_STRING: 'La devise doit être une chaîne valide.',
    PAYMENT_CREATED:
      'Paiement initié avec succès en utilisant la méthode PayPal',
    PAYMENT_EXECUTE:
      'Paiement exécuté avec succès en utilisant la méthode PayPal',
    PLAN_AMOUNT_REQUIRED: 'Le montant est requis pour créer un plan.',
    PLAN_CURRENCY_REQUIRED: 'La devise est requise pour créer un plan.',
    PLAN_NAME_REQUIRED: 'Le nom du plan est requis pour créer un plan.',
    PLAN_TYPE_REQUIRED: 'Le type de plan est requis pour créer un plan.',
    PLAN_LIMIT_REQUIRED: 'La limite du plan est requise pour créer un plan.',
    PLAN_FEATURE_NAME_REQUIRED:
      'Le nom de la fonctionnalité du plan est requis pour créer une fonctionnalité de plan.',

    FREE_PLAN_PURCHASE: "Acheter avec succès un forfait gratuit.",
    FREE_PLAN_NOT_PURCHASE: "Forfait gratuit sans achat. Veuillez réessayer.",

    PERMISSION_NAME_REQUIRED: 'Nom permission requis.',
    PERMISSION_ALREADY_EXISTS:'Une permission portant le même nom existe déjà.'
  },
};


module.exports = { languages }