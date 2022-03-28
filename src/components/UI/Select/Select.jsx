import classes from './Select.module.css'
import { useCallback } from 'react'

const Select = (props) => {
    const htmlFor = `${props.label}-${Math.random()}`
    //eslint-disable-next-line
    const getOption = useCallback(props.options.map((option, index) => {
        return (
            <option
                value={option.value}
                key={option.value + index}
            >
                {option.text}
            </option>
        )
    }), [props.options])

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
            {getOption}
            </select>
        </div>
    )
}

export default Select;