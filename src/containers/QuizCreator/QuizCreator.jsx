import React, {Component} from 'react'
import classes from './QuizCreator.module.css'
import Button from 'components/UI/Button/Button'
import {createControl, validate, validateForm} from 'form/formFramework'
import Input from 'components/UI/Input/Input'
import Select from 'components/UI/Select/Select'
import { connect } from 'react-redux'
import { createQuizQuestion, finishCreateQuiz } from 'store/actions/actionCreate'

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

class QuizCreator extends Component {
    state = {
        formControls: createFormControls(),
        rightAnswerId: 1,
        isFormValid: false
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()
        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        }
        this.props.createQuizQuestion(questionItem)

        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false
        })
    }

    createQuizHandler = (event) => {
        event.preventDefault()
        this.setState({
            formControls: createFormControls(),
            rightAnswerId: 1,
            isFormValid: false 
        })
        this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input 
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null}
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                
                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        <Select 
                            label='Выберите правильный ответ'
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {text:1, value: 1},
                                {text:2, value: 2},
                                {text:3, value: 3},
                                {text:4, value: 4}
                            ]}
                        />

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)