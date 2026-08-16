from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.model_loader import predict_churn

app = FastAPI(
    title="E-Commerce Customer Churn Prediction API",
    description="Machine Learning API for predicting customer churn risk",
    version="1.0.0"
)


# Allow React frontend to communicate with the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "E-Commerce Customer Churn API is running!"
    }


@app.post("/predict")
def predict(customer_data: dict):
    result = predict_churn(customer_data)

    return result