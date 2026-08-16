import os
import joblib
import pandas as pd


# Get the project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Paths to saved ML files
MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "random_forest_churn_model.pkl"
)

FEATURE_PATH = os.path.join(
    BASE_DIR,
    "model",
    "feature_columns.pkl"
)


# Load model and feature columns
model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURE_PATH)


def predict_churn(customer_data):
    """
    Predict customer churn from customer information.
    """

    # Convert input dictionary into DataFrame
    customer_df = pd.DataFrame([customer_data])

    # One-hot encode categorical features
    customer_encoded = pd.get_dummies(
        customer_df,
        drop_first=True
    )

    # Make sure the input has exactly the same
    # columns as the training dataset
    customer_encoded = customer_encoded.reindex(
        columns=feature_columns,
        fill_value=0
    )

    # Make prediction
    prediction = model.predict(customer_encoded)[0]

    # Get probability of churn
    probability = model.predict_proba(customer_encoded)[0][1]

    # Determine risk level
    if probability >= 0.70:
        risk = "High"
    elif probability >= 0.40:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "prediction": int(prediction),
        "churn_probability": round(float(probability) * 100, 2),
        "risk_level": risk
    }