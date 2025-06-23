import { useContext, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import useHttp from "../hooks/use-http";
import UserContext from "../store/user-context";

const NewPasswordPage = () => {
    const { sendRequest, isLoading, error } = useHttp();

    const { login } = useContext(UserContext);

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const passwordInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        if (!(searchParams.has('id') && searchParams.has('token'))) {
            return;
        }

        const id = searchParams.get('id');
        const token = searchParams.get('token');

        sendRequest({
            url: `${process.env.REACT_APP_BACK_URL}/users/resetPassword?token=${token}&id=${id}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                password: passwordInputRef.current.value
            }
        }, (data) => {
            login(data.user, data.token);
            navigate('/', { replace: true });
        });
    }

    if (isLoading) {
        return <p>Sending...</p>;
    }

    return (
        <form onSubmit={submitHandler}>
            <label htmlFor="password">סיסמה חדשה</label>
            <input type="password" id="password" ref={passwordInputRef} />
            <button>אתחל סיסמה</button>
            {error &&
                <p>{error}</p>
            }
        </form>
    )
}

export default NewPasswordPage;
