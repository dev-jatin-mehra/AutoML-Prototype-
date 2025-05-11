import time
import pandas as pd
from .train import train_models

def run_automl(file_path):
    start_time = time.time()
    
    # Load dataset
    df = pd.read_csv(file_path)

    # Train multiple models & get best one
    best_model, best_metrics = train_models(df)

    end_time = time.time()
    time_taken = round(end_time - start_time, 2)

    return {
        "model_name": best_model,
        "performance_metrics": best_metrics,
        "time_taken": time_taken
    }
