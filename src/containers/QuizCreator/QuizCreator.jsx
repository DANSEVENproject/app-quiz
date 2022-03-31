import React,{useCallback, useState} from 'react'
import classes from './QuizCreator.module.css'
import Button from 'components/UI/Button/Button'
import {createControl, validate, validateForm} from 'form/formFramework'
import Input from 'components/UI/Input/Input'
import Select from 'components/UI/Select/Select'
import { createQuizQuestion, finishCreateQuiz } from 'store/actions/actionCreate'
import { useDispatch, useSelector } from 'react-redux'
import {quizCreate} from 'store/selectors/selectors'

function createOptionControl(nameLabel, value, idQuestion) {
    return createControl({
        label: `${nameLabel}`,
        errorMessage: `${value} не может быть пустым`,
        id: idQuestion
    },  {required: true})
}

function createFormControls() {
    return {
        question: createOptionControl('Введите вопрос', 'Вопрос'),
        option1: createOptionControl('Вариант 1', 'Значение', 1),
        option2: createOptionControl('Вариант 2', 'Значение', 2),
        option3: createOptionControl('Вариант 3', 'Значение', 3),
        option4: createOptionControl('Вариант 4', 'Значение', 4)
    }
}

const QuizCreator = () => {
    const selector = useSelector(quizCreate)
    const dispatch = useDispatch()
    const props = {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
    const [state, setState] = useState({
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    })
    
    const submitHandler = (event) => {
        event.preventDefault()
    }

    const addQuestionHandler = (event) => {
        event.preventDefault()
        const {question, option1, option2, option3, option4} = state.formControls
        const questionItem = {
            question: question.value,
            id: selector.quiz.length + 1,
            rightAnswerId: state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        props.createQuizQuestion(questionItem)
        setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    const selectChangeHandler = (event) => {
        setState(state => ({
            ...state,
            rightAnswerId: +event.target.value
        }))
    }

    const createQuizHandler = (event) => {
        event.preventDefault()
        setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
        props.finishCreateQuiz()
        selector.quiz.length = 0
    }

    const changeHandler = (value, controlName) => {
        const formControls = {...state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }
    //eslint-disable-next-line
    const renderControls = useCallback(
        Object.keys(state.formControls).map((controlName, index) => {
            const control = state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null}
                </React.Fragment>
            )
        }), [state.formControls])
   
    return (
        <div className={classes.QuizCreator}>
            <div>
                <h1>Создание теста</h1>
            
                <form onSubmit={submitHandler}>

                    {renderControls}

                    <Select 
                        label='Выберите правильный ответ'
                        value={state.rightAnswerId}
                        onChange={selectChangeHandler}
                        options={[
                            {text:1, value: 1},
                            {text:2, value: 2},
                            {text:3, value: 3},
                            {text:4, value: 4}
                        ]}
                    />

                    <Button
                        type='primary'
                        onClick={addQuestionHandler}
                        disabled={!state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type='success'
                        onClick={createQuizHandler}
                        disabled={selector.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default QuizCreator