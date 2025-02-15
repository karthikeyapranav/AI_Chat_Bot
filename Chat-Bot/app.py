from flask import Flask, request, jsonify, send_from_directory
from transformers import pipeline

app = Flask(__name__)

# Initialize the conversational pipeline
chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = chatbot(user_input)
    return jsonify({'response': response[0]['generated_text']})

@app.route('/')
def index():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
