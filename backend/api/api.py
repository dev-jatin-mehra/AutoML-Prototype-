from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils.automl import run_automl

app = Flask(__name__)
CORS(app)

@app.route("/train", methods=["POST"])
def train():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = secure_filename(file.filename)
    file.save(file_path)

    result = run_automl(file_path)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
