import * as Yup from 'yup';
import ERRORS from '../../constants/formErrors';

const SignupSchema = Yup.object().shape({
  name: Yup
    .string()
    .oneOf(['Pepe', 'Paco'], ERRORS.ERROR_NAME_ENUM)
    .required(ERRORS.ERROR_REQUIRED),
  email: Yup
    .string()
    .email(ERRORS.ERROR_VALID_EMAIL)
    .required(ERRORS.ERROR_REQUIRED),
  password: Yup
    .string()
    .min(8, ERRORS.ERROR_PASSWORD_LENGTH)
    .required(ERRORS.ERROR_REQUIRED)
})

export default SignupSchema