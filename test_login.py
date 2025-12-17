import requests
import json

url = "http://localhost/auth/api/v1/login"
data = {"email": "admin@medtrack.com", "password": "password123"}
headers = {"Content-Type": "application/json"}

try:
    response = requests.post(url, json=data, headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
