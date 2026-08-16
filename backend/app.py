from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .model_loader import predict_churn


# --------------------------------------------------
# FastAPI Application
# --------------------------------------------------

app = FastAPI(
    title="E-Commerce Customer Churn Prediction API",
    description="Machine Learning API for predicting customer churn risk",
    version="1.0.0"
)


# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Request Data Model
# --------------------------------------------------

class CustomerData(BaseModel):

    Tenure: float
    CityTier: int
    WarehouseToHome: float
    HourSpendOnApp: float
    NumberOfDeviceRegistered: int
    SatisfactionScore: int
    NumberOfAddress: int
    Complain: int
    OrderAmountHikeFromlastYear: float
    CouponUsed: float
    OrderCount: float
    DaySinceLastOrder: float
    CashbackAmount: float

    PreferredLoginDevice: str
    PreferredPaymentMode: str
    Gender: str
    PreferedOrderCat: str
    MaritalStatus: str


# --------------------------------------------------
# Home Route
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "E-Commerce Customer Churn API is running!"
    }


# --------------------------------------------------
# Health Check
# --------------------------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "message": "Churn prediction API is working"
    }


# --------------------------------------------------
# Prediction Route
# --------------------------------------------------

@app.post("/predict")
def predict(data: CustomerData):

    customer_data = data.dict()

    result = predict_churn(customer_data)

    prediction = result["prediction"]
    probability = result["churn_probability"]

    if prediction == 1:
        risk_level = "High"
    else:
        risk_level = "Low"

    return {
        "prediction": prediction,
        "churn_probability": probability,
        "risk_level": risk_level
    }