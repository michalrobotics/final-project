import Modal from "../UI/Modal";

type Props = {
    onClose: () => void;
    title: string;
    description: string;
}

const Notification: React.FC<Props> = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <button onClick={props.onClose}>סגור</button>
        </Modal>
    );
}

export default Notification;
