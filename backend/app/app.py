from flask import Flask, render_template, request, Markup
import numpy as np
import pandas as pd
from utils.disease import disease_dic
from utils.fertilizer import fertilizer_dic
import requests
from flask_cors import CORS
from flask import jsonify
import config
import pickle
import io
import torch
from torchvision import transforms
from PIL import Image
from utils.model import ResNet9

disease_classes = ['Apple___Apple_scab',
                   'Apple___Black_rot',
                   'Apple___Cedar_apple_rust',
                   'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew',
                   'Cherry_(including_sour)___healthy',
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
                   'Corn_(maize)___Common_rust_',
                   'Corn_(maize)___Northern_Leaf_Blight',
                   'Corn_(maize)___healthy',
                   'Grape___Black_rot',
                   'Grape___Esca_(Black_Measles)',
                   'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
                   'Grape___healthy',
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot',
                   'Peach___healthy',
                   'Pepper,_bell___Bacterial_spot',
                   'Pepper,_bell___healthy',
                   'Potato___Early_blight',
                   'Potato___Late_blight',
                   'Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch',
                   'Strawberry___healthy',
                   'Tomato___Bacterial_spot',
                   'Tomato___Early_blight',
                   'Tomato___Late_blight',
                   'Tomato___Leaf_Mold',
                   'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite',
                   'Tomato___Target_Spot',
                   'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
                   'Tomato___Tomato_mosaic_virus',
                   'Tomato___healthy']

disease_model_path = 'models/plant_disease_model.pth'
disease_model = ResNet9(3, len(disease_classes))
disease_model.load_state_dict(torch.load(
    disease_model_path, map_location=torch.device('cpu')))
disease_model.eval()

crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(
    open(crop_recommendation_model_path, 'rb'))



def weather_fetch(city_name):
    """
    Fetch and returns the temperature and humidity of a city
    :params: city_name
    :return: temperature, humidity
    """
    api_key = config.weather_api_key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None


def predict_image(img, model=disease_model):
    """
    Transforms image to tensor and predicts disease label
    :params: image
    :return: prediction (string)
    """
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.ToTensor(),
    ])
    image = Image.open(io.BytesIO(img))
    img_t = transform(image)
    img_u = torch.unsqueeze(img_t, 0)

    yb = model(img_u)
    _, preds = torch.max(yb, dim=1)
    prediction = disease_classes[preds[0].item()]

    return prediction


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})




@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    try:
        data = request.json  
        print("Received JSON Data:", data)

        N = int(data['N'])
        P = int(data['P'])
        K = int(data['K'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        city = data['city']

        if weather_fetch(city):
            temperature, humidity = weather_fetch(city)
            prediction_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            my_prediction = crop_recommendation_model.predict(prediction_data)
            final_prediction = my_prediction[0]

            # Return JSON response
            return jsonify({"prediction": final_prediction})
        else:
            return jsonify({"error": "City not found"}), 404
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Invalid request"}), 400


# @app.route('/generate-pdf', methods=['POST'])
def generate_pdf(message,output):
    from fpdf import FPDF
    from PyPDF2 import PdfReader, PdfWriter
    import os
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.application import MIMEApplication

    output_directory = "./static/pdfs"
    os.makedirs(output_directory, exist_ok=True)

    output_path = os.path.join(output_directory, output)
    # protected_output_path = os.path.join(output_directory, "protected.pdf")

    pdf = FPDF('P', 'mm', 'Letter')
    pdf.add_page()
    pdf.set_font('helvetica', '', 16)
    message = message
    pdf.set_right_margin(10)
    pdf.cell(40, 10,message)
    pdf.output(output_path)

    reader = PdfReader(output_path)
    writer = PdfWriter()
    for page_num in range(len(reader.pages)):
        writer.add_page(reader.pages[page_num])

# password = "Lavangam@123"
# writer.encrypt(password)

# with open(protected_output_path, "wb") as f:
#     writer.write(f)

# print(f"Password-protected PDF saved at: {protected_output_path}")


@ app.route('/fertilizer-predict', methods=['POST'])
def fert_recommend():
    title = 'Harvestify - Fertilizer Suggestion'
    
    data = request.json

    crop_name = str(data['cropname'])
    N = int(data['nitrogen'])   
    P = int(data['phosphorous'])
    K = int(data['pottasium'])
    # ph = float(request.form['ph'])

    df = pd.read_csv('Data/fertilizer.csv')

    try:
        print("Crop name : ",crop_name)
        nr = df[df['Crop'] == crop_name]['N'].iloc[0]
        pr = df[df['Crop'] == crop_name]['P'].iloc[0]
        kr = df[df['Crop'] == crop_name]['K'].iloc[0]
    except IndexError:
        return jsonify({'error': 'Crop not found in the dataset'}), 400

    n = nr - N
    p = pr - P
    k = kr - K
    temp = {abs(n): "N", abs(p): "P", abs(k): "K"}
    max_value = temp[max(temp.keys())]
    if max_value == "N":
        if n < 0:
            key = 'NHigh'
        else:
            key = "Nlow"
    elif max_value == "P":
        if p < 0:
            key = 'PHigh'
        else:
            key = "Plow"
    else:
        if k < 0:
            key = 'KHigh'
        else:
            key = "Klow"

    recommendation  = Markup(str(fertilizer_dic[key]))
    
    print("Crop : " , recommendation)

    return jsonify({"success": True,'recommendation': recommendation })




@app.route('/disease-predict', methods=['GET', 'POST'])
def disease_prediction():
    title = 'Harvestify - Disease Detection'

    if request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400
        
        try:
            img = file.read()

            prediction = predict_image(img)

            prediction = Markup(str(disease_dic[prediction]))
            result_filename = f"prediction_result_{file.filename.rsplit('.', 1)[0]}.pdf"
            
            # generate_pdf(prediction,result_filename)
            # download_url = './static/pdfs/{result_filename}'
            
            
            return jsonify({
                "success": True,
                "prediction": Markup(str(prediction)),
                # 'downloadUrl': download_url
            })
            
        except e as Exception:
            return jsonify({
                "success": False,
                "error": str(e)
            }), 500
    return jsonify({"message": "Use POST method to predict disease"}), 405


if __name__ == '__main__':
    app.run(debug=True)
