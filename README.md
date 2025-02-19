# AutoML Web Application (Prototype)

## 🚀 Overview

This AutoML web application allows users to upload a dataset and automatically trains multiple machine learning models to determine the best-performing one based on evaluation metrics.

## 🌟 Features

- Upload datasets in **CSV** format.
- Train multiple models automatically and return the best one.
- Provides model performance metrics, training time, and predictions.
- Fully responsive frontend (Vanilla JavaScript) with a Flask backend.
- REST API for seamless integration with other applications.

---

## 📂 Project Structure

```
AutoML/
│
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── api.py                  # Main Flask application
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   ├── automl.py           # Handles AutoML processing
│   │   │   ├── train.py            # Machine learning model training logic
│   │   ├── requirements.txt        # Python dependencies
│   ├── logs/                       # Stores backend logs
│
├── commands
│   ├── cmd.cmd                     #contain the curl command for api testing
│
├── test
│   ├── train.csv
│
├── frontend/
│   ├── index.html                   # Main webpage
│   ├── upload.html                   # File upload page
│   ├── result.html                   # Displays model results
│   ├── css/
│   ├── src/
│   ├── assets/
│
│── .gitignore
└── README.md                        # Documentation
```

---

## ⚙️ Setup and Installation

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/dev-jatin-mehra/AutoML.git
cd AutoML
```

### **2️⃣ Backend Setup (Flask API)**

Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Run the Flask server:

```bash
python api/api.py
```

### **3️⃣ Frontend Setup**

Simply open `frontend/index.html` in a browser or use a local server:

```bash
cd frontend
python -m http.server 8080  # Optional: Serve frontend locally
```

```
or use live server
```

---

## 🛠 To Run Backend Locally

```bash
cd backend/api
app.run(debug=True) * replace in the existing main code in place of gunicorn command *
```

---

## 🛠 API Endpoints

### **1️⃣ Train a Model**

**Endpoint:**

```
POST /train
```

**Request:** (Upload dataset)

```bash
curl -X POST -F "file=@path/to/dataset.csv" http://localhost:5000/train
```

**Response:**

```json
{
  "model_name": "RandomForest",
  "performance_metrics": { "accuracy": 0.95 },
  "time_taken": 10.5
}
```

---

## 🎯 Future Enhancements

- Add support for deep learning models.
- Implement more backend & frontend features.
- Implement real-time prediction API.
- Enable dataset visualization.

---

## 👨‍💻 Contributing

Pull requests are welcome! Please open an issue for discussions before making major changes.

---

## 📞 Contact

For queries, contact: [Jatin](mailto:jatinsinghmehras.com)
