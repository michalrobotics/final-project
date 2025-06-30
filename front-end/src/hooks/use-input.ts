import { useReducer } from "react";

type InputState = {
    value: string;
    isTouched: boolean;
};

type Action =
    | { type: "RESET" }
    | { type: "BLUR" }
    | { type: "INPUT"; value: string; }

    const initialInputState = {
        value: '',
        isTouched: false
    };

const inputStateReducer = (state: InputState, action: Action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, isTouched: state.isTouched };
    }
    if (action.type === 'BLUR') {
        return { value: state.value, isTouched: true };
    }
    if (action.type === 'RESET') {
        return initialInputState;
    }
    return state;
}

const useInput = (validateFunction: (value: string) => boolean) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

    const valueIsValid = validateFunction(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'INPUT', value: event.target.value });
    }

    const inputBlurHandler = () => {
        dispatch({ type: 'BLUR' });
    }

    const reset = () => {
        dispatch({ type: 'RESET' });
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}

export default useInput;
