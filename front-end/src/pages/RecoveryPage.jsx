import { useRef } from "react";

import useHttp from "../hooks/use-http";

const RecoveryPage = () => {
    const { sendRequest, isLoading, error } = useHttp();

    const emailInputRef = useRef();
    const contentInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        sendRequest({
            url: 'http://localhost:8000/email',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                email: emailInputRef.current.value,
                content: contentInputRef.current.value
            }
        });
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (isLoading) {
        return <p>Sending...</p>;
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="email">אימייל</label>
            <input type="email" id="email" ref={emailInputRef} />
            <label htmlFor="content">תוכן</label>
            <textarea name="content" id="content" ref={contentInputRef} />
            <button>send</button>
        </form>
    )
}

export default RecoveryPage;
