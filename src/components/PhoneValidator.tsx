import { useState } from "react";
import axios from "axios";
import Select from "react-select";
import Popup from "../components/Popup.tsx"; 
import countryData from "../data/countries.json";
import "/src/components/PhoneValidator.css";


const API_KEY = import.meta.env.VITE_API_KEY;

const PhoneValidator = () => {
  const [selectedCountry, setSelectedCountry] = useState({ code: "+234", label: "🇳🇬 Nigeria" });
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<{ message: string; type: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const validatePhone = async () => {
    if (!phone.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://api.veriphone.io/v2/verify`, {
        params: {
          phone: `${selectedCountry.code}${phone}`,
          key: API_KEY,
        },
      });

      const data = response.data;

      if (data.phone_valid) {
        setResult({ message: `✅ Valid ${data.country} Number (Carrier: ${data.carrier})`, type: "valid" });
      } else {
        setResult({ message: "❌ Invalid or Fake Number!", type: "invalid" });
      }
    } catch (error) {
      setResult({ message: "⚠ Error validating number", type: "error" });
    }
    setLoading(false);
  };

  const clearInput = () => {
    setPhone("");
    setResult(null);
  };

  return (
    <>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
          
      <div className="phone-validator">
        <h2>Phone Number <span>Validator</span></h2>

        <div className="phone-container">
          <Select
            options={countryData}
            value={selectedCountry}
            onChange={(option) => setSelectedCountry(option!)}
            className="country-select"
          />

          <input
            type="text"
            placeholder="Enter phone number..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="buttons">
            <button onClick={validatePhone} disabled={loading || phone === ""} className={phone === "" ? "no-drop" : ""}>Check</button>
            <button onClick={clearInput}>Clear</button>
          </div>
        </div>

        {loading && <p>🔄 Checking...</p>}
        {result && <p className={`result ${result.type}`}>{result.message}</p>}
      </div>

    </>
  );
};

export default PhoneValidator;
