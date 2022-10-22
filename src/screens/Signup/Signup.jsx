import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/misc/Input';
import { createUser } from '../../services/UserService';
import SignupSchema from './SignupSchema';

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  image: ''
}

function Signup() {
  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError, setFieldValue
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: SignupSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })

  const navigate = useNavigate();

  function onSubmit(values) {// Lo declaro como function en vez de const, porque asi por el hoisting la puedo usar en el useFormik
    const formData = new FormData()

    // formData.append('email', values.email) Tengo que ir haciendo append de cada uno de los campos

    // O si se que en values esta todo, hago un bucle
    for (let value in values) {
      formData.append(value, values[value])
    }

    createUser(formData)
      .then(user => {
        console.log(user);
        // resetForm()
        navigate('/login', { state: {
          email: values.email
        } })
      })
      .catch(err => {
        console.log(err.response.data)

        err.response.data &&
          Object.keys(err.response.data.errors)
            .forEach((errorKey) => {
              setFieldError(errorKey, err.response.data.errors[errorKey])
            })
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const [form, setForm] = useState({ email: '', name: '' })

  const handleOnChange = event => {
    const { name, value, type, files } = event

    if (type === 'file') {
      setForm({ ...form, [name]: files[0] })
    } else {
      setForm({ ...form, [name]: value }) // C://djakldjalksjd
    }
  }

  return (
    <div className="Signup container">
      <h1>Sign up</h1>

      <form onSubmit={handleSubmit}> {/* Si el onSubmit esta en el form, se puede hacer submit con el Enter o con un button de type submit(valor por defecto) */}
        <Input
          label="Name"
          placeholder="Add user name"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          onBlur={handleBlur} // Cuando dejas de hacer focus en un input
        />

        <Input
          label="Email"
          placeholder="Add email"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          onBlur={handleBlur}
        />

        <Input
          label="Password"
          placeholder="Add password"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          onBlur={handleBlur}
        />

        <Input
          label="File"
          placeholder="Add file"
          type="file"
          name="image"
          id="file"
          // value={values.password}
          onChange={(e) => setFieldValue('image', e.target.files[0])}
          error={errors.image}
          onBlur={handleBlur}
        />

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Loading' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Signup