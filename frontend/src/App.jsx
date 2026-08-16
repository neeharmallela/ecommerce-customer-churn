import { useState } from "react";
import axios from "axios";
import {
  Users,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from "lucide-react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    Tenure: 12,
    CityTier: 1,
    WarehouseToHome: 10,
    HourSpendOnApp: 3,
    NumberOfDeviceRegistered: 3,
    SatisfactionScore: 3,
    NumberOfAddress: 2,
    Complain: 0,
    OrderAmountHikeFromlastYear: 15,
    CouponUsed: 2,
    OrderCount: 5,
    DaySinceLastOrder: 3,
    CashbackAmount: 150,
    PreferredLoginDevice: "Mobile Phone",
    PreferredPaymentMode: "Debit Card",
    Gender: "Male",
    PreferedOrderCat: "Laptop & Accessory",
    MaritalStatus: "Married",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const numericFields = [
      "Tenure",
      "CityTier",
      "WarehouseToHome",
      "HourSpendOnApp",
      "NumberOfDeviceRegistered",
      "SatisfactionScore",
      "NumberOfAddress",
      "Complain",
      "OrderAmountHikeFromlastYear",
      "CouponUsed",
      "OrderCount",
      "DaySinceLastOrder",
      "CashbackAmount",
    ];

    setFormData({
      ...formData,
      [name]: numericFields.includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);

      setResult({
        error: "Unable to connect to the prediction server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskClass = () => {
    if (!result) return "";

    if (result.risk_level === "High") return "high";
    if (result.risk_level === "Medium") return "medium";

    return "low";
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="brand">
          <Activity size={30} />
          <div>
            <h1>ChurnGuard</h1>
            <p>Customer Churn Early Warning System</p>
          </div>
        </div>

        <div className="status">
          <span></span>
          ML System Online
        </div>
      </header>

      {/* Dashboard */}
      <main className="container">

        <section className="hero">
          <div>
            <h2>Customer Churn Risk Assessment</h2>
            <p>
              Enter customer information to predict the likelihood
              of customer churn using our machine learning model.
            </p>
          </div>

          <div className="hero-icon">
            <ShieldCheck size={55} />
          </div>
        </section>

        <div className="content">

          {/* Form */}
          <section className="card form-card">

            <div className="card-title">
              <Users size={22} />
              <h3>Customer Information</h3>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="field">
                  <label>Tenure (Months)</label>
                  <input
                    type="number"
                    name="Tenure"
                    value={formData.Tenure}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>City Tier</label>
                  <select
                    name="CityTier"
                    value={formData.CityTier}
                    onChange={handleChange}
                  >
                    <option value="1">Tier 1</option>
                    <option value="2">Tier 2</option>
                    <option value="3">Tier 3</option>
                  </select>
                </div>

                <div className="field">
                  <label>Warehouse Distance</label>
                  <input
                    type="number"
                    name="WarehouseToHome"
                    value={formData.WarehouseToHome}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Hours Spent on App</label>
                  <input
                    type="number"
                    name="HourSpendOnApp"
                    value={formData.HourSpendOnApp}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Registered Devices</label>
                  <input
                    type="number"
                    name="NumberOfDeviceRegistered"
                    value={formData.NumberOfDeviceRegistered}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Satisfaction Score</label>
                  <select
                    name="SatisfactionScore"
                    value={formData.SatisfactionScore}
                    onChange={handleChange}
                  >
                    <option value="1">1 - Very Low</option>
                    <option value="2">2 - Low</option>
                    <option value="3">3 - Average</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="field">
                  <label>Number of Addresses</label>
                  <input
                    type="number"
                    name="NumberOfAddress"
                    value={formData.NumberOfAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Complained?</label>
                  <select
                    name="Complain"
                    value={formData.Complain}
                    onChange={handleChange}
                  >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>

                <div className="field">
                  <label>Order Amount Increase (%)</label>
                  <input
                    type="number"
                    name="OrderAmountHikeFromlastYear"
                    value={formData.OrderAmountHikeFromlastYear}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Coupons Used</label>
                  <input
                    type="number"
                    name="CouponUsed"
                    value={formData.CouponUsed}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Order Count</label>
                  <input
                    type="number"
                    name="OrderCount"
                    value={formData.OrderCount}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Days Since Last Order</label>
                  <input
                    type="number"
                    name="DaySinceLastOrder"
                    value={formData.DaySinceLastOrder}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Cashback Amount</label>
                  <input
                    type="number"
                    name="CashbackAmount"
                    value={formData.CashbackAmount}
                    onChange={handleChange}
                  />
                </div>

                <div className="field">
                  <label>Login Device</label>
                  <select
                    name="PreferredLoginDevice"
                    value={formData.PreferredLoginDevice}
                    onChange={handleChange}
                  >
                    <option>Mobile Phone</option>
                    <option>Computer</option>
                  </select>
                </div>

                <div className="field">
                  <label>Payment Mode</label>
                  <select
                    name="PreferredPaymentMode"
                    value={formData.PreferredPaymentMode}
                    onChange={handleChange}
                  >
                    <option>Debit Card</option>
                    <option>Credit Card</option>
                    <option>Cash on Delivery</option>
                    <option>UPI</option>
                    <option>E wallet</option>
                  </select>
                </div>

                <div className="field">
                  <label>Gender</label>
                  <select
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="field">
                  <label>Preferred Order Category</label>
                  <select
                    name="PreferedOrderCat"
                    value={formData.PreferedOrderCat}
                    onChange={handleChange}
                  >
                    <option>Laptop & Accessory</option>
                    <option>Mobile Phone</option>
                    <option>Fashion</option>
                    <option>Grocery</option>
                    <option>Others</option>
                  </select>
                </div>

                <div className="field">
                  <label>Marital Status</label>
                  <select
                    name="MaritalStatus"
                    value={formData.MaritalStatus}
                    onChange={handleChange}
                  >
                    <option>Married</option>
                    <option>Single</option>
                    <option>Divorced</option>
                  </select>
                </div>

              </div>

              <button
                className="predict-btn"
                type="submit"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Predict Churn Risk"}
              </button>

            </form>
          </section>

          {/* Result */}
          <section className="card result-card">

            <div className="card-title">
              <TrendingDown size={22} />
              <h3>Prediction Result</h3>
            </div>

            {!result && (
              <div className="empty-result">
                <Activity size={50} />
                <h3>Ready for Analysis</h3>
                <p>
                  Enter customer information and click
                  "Predict Churn Risk".
                </p>
              </div>
            )}

            {result?.error && (
              <div className="error-box">
                <AlertTriangle />
                <p>{result.error}</p>
              </div>
            )}

            {result && !result.error && (
              <div className={`result ${getRiskClass()}`}>

                <div className="risk-icon">
                  {result.risk_level === "High"
                    ? <AlertTriangle size={50} />
                    : <ShieldCheck size={50} />
                  }
                </div>

                <h2>{result.risk_level} Risk</h2>

                <div className="probability">
                  {result.churn_probability}%
                </div>

                <p>Estimated Churn Probability</p>

                <div className="progress">
                  <div
                    style={{
                      width: `${result.churn_probability}%`,
                    }}
                  ></div>
                </div>

                <div className="prediction-text">
                  {result.prediction === 1
                    ? "This customer is likely to churn."
                    : "This customer is unlikely to churn."}
                </div>

                <div className="recommendation">
                  <strong>Recommended Action</strong>

                  <p>
                    {result.risk_level === "High"
                      ? "Contact the customer and offer a personalized retention incentive."
                      : result.risk_level === "Medium"
                        ? "Monitor customer activity and consider a targeted engagement campaign."
                        : "Continue providing a good customer experience and monitor future activity."}
                  </p>
                </div>

              </div>
            )}

          </section>

        </div>

      </main>

      <footer>
        <p>
          E-Commerce Customer Churn Early Warning System
          <span> • </span>
          Machine Learning Project
        </p>
      </footer>

    </div>
  );
}

export default App;