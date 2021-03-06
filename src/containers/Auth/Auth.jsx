import {useState} from 'react'
import Button from 'components/UI/Button/Button'
import classes from './Auth.module.css'
import Input from 'components/UI/Input/Input'
import { auth } from 'store/actions/auth'
import { useDispatch} from 'react-redux'

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const Auth = () => {
    const dispatch = useDispatch()
    const props = {auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))}
    const [state, setState] = useState({
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    })

    const loginHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            true
        )
    }

    const registerHandler = () => {
        props.auth(
            state.formControls.email.value,
            state.formControls.password.value,
            false
        )
    }

    const submitHandler = (event) => {
        event.preventDefault()
    }

    const validateControl = (value, validation) => {
        if (!validation) return true

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, controlName) => {
        const formControls = { ...state.formControls}
        const control = { ...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = validateControl(control.value, control.validation)
   
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        
        setState({
            formControls, isFormValid
        })
    }

    const renderInputs = () => {
        const generateKeys = Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]   
            return (
                <Input 
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => onChangeHandler(event, controlName)}
                />
            )
        })
        return (generateKeys)
    }

    return (
        <div className={classes.Auth}>
            <div>
                <h1>Авторизация</h1>

                <form onSubmit={submitHandler} className={classes.AuthForm}>

                    {renderInputs()}

                    <Button 
                        type='success' 
                        onClick={loginHandler}
                        disabled={!state.isFormValid}
                    >
                        Войти
                    </Button>
                    <Button 
                        type='primary' 
                        onClick={registerHandler}
                        disabled={!state.isFormValid}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </div>   
        </div>
    )
}

export default Auth