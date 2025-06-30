import { FormEvent, useRef } from "react";

import useHttp from "../../hooks/use-http";

const RecoveryForm: React.FC<{ onBack: () => void }> = (props) => {
    const { sendRequest, isLoading, error } = useHttp();

    const emailInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: FormEvent) => {
        event.preventDefault();
        sendRequest({
            url: `${process.env.REACT_APP_BACK_URL}/users/recover`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: emailInputRef.current!.value
            }
        }, null);
    }

    if (isLoading) {
        return <p>Sending...</p>;
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="email">אימייל</label>
            <input type="email" id="email" ref={emailInputRef} />
            <button>שלח מייל שחזור</button>
            <p onClick={props.onBack}>חזרה להתחברות</p>
            {error &&
                <p>{error}</p>
            }
        </form>
    )
}

export default RecoveryForm;
