import { useState, useContext } from "react";

import RequestItem from "../RequestItem";
import UserContext from "../../../store/user-context";
import ApproveModal from "../../Prompts/ApproveModal";
import RejectModal from "../../Prompts/RejectModal";

const AdminRequestItem = (props) => {
   const { token } = useContext(UserContext);

   const [showApproveModal, setShowApproveModal] = useState(false);
   const [showRejectModal, setShowRejectModal] = useState(false);

   const approveHandler = () => {
      setShowApproveModal(true);
   }

   const cancelApproval = () => {
      setShowApproveModal(false);
   }

   const rejectHandler = () => {
      setShowRejectModal(true);
   }

   const cancelReject = () => {
      setShowRejectModal(false);
   }

   return (
      <>
         <RequestItem request={props.request} showDate={props.showDate} showUser={props.showUser} />
         <div>
            <button onClick={approveHandler}>אשר</button>
            <button onClick={rejectHandler}>סרב</button>
            {showApproveModal &&
               <ApproveModal request={props.request} onClose={cancelApproval} token={token} />
            }
            {showRejectModal &&
               <RejectModal request={props.request} onClose={cancelReject} token={token} />
            }
         </div>
      </>
   );
}

export default AdminRequestItem;
