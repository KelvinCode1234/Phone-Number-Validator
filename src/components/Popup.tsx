import { FC } from "react";
import "./Popup.css";

interface PopupProps {
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>🔒 Privacy Notice</h3>
        <p>Your phone number is <b>NOT</b> stored or shared. This tool only checks validity.</p>
        <button onClick={onClose} className="accept">OK, Got It!</button>
      </div>
    </div>
  );
};

export default Popup