import Modal from "../UI/Modal";

const Notification = (props) => {
    return (
        <Modal onClose={props.onClose}>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <button onClick={props.onClose}>סגור</button>
        </Modal>
    );
}

export default Notification;
