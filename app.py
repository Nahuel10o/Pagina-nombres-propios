from flask import Flask, render_template, request
import spacy
from collections import Counter

app = Flask(__name__)

# Cargar el modelo de lenguaje de Spacy
nlp = spacy.load('es_core_news_sm')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analizar', methods=['POST'])
def analizar():
    texto = request.form['texto']

    # Procesar el texto con Spacy
    doc = nlp(texto)

    # Filtrar los nombres propios
    nombres_propios = [token.text for token in doc if token.pos_ == 'PROPN']

    # Contar la frecuencia de los nombres propios
    frecuencia_nombres_propios = Counter(nombres_propios)

    # Obtener los nombres propios más frecuentes (top 20)
    top_nombres_propios = frecuencia_nombres_propios.most_common(20)

    return render_template('resultado.html', resultados=top_nombres_propios)

if __name__ == '__main__':
    app.run(debug=True)
