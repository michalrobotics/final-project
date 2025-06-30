import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
   return <div className={classes.backdrop} onClick={props.onClose} />;
}

const ModalOverlay: React.FC<{ children: React.ReactNode }> = (props) => {
   return (
      <div className={classes.modal}>
         <div className={classes.content}>{props.children}</div>
      </div>
   );
}

const portalElement = document.getElementById('overlays') as HTMLElement;

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; }> = (props) => {
   return (
      <>
         {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)};
         {ReactDOM.createPortal(
            <ModalOverlay>
               {props.children}
            </ModalOverlay>,
            portalElement
         )}
      </>
   );
}

export default Modal;
