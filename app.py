from IPython.display import display  # Allows the use of display() for DataFrames
from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle
import pandas as pd
# loading model
loaded_model = pickle.load(open('naive_bayes_96.sav', 'rb'))

# count vector to transform it to array of frequency
count_vect = pickle.load(open('count_vect', 'rb'))

app = Flask(__name__)
# model = pickle.load(open('model.pkl', 'rb'))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/test', methods=['POST'])
def test():
    data = request.get_json()
    print(data)

    # sample of input data
    # input is "استغفر الله االعظيم "
    post = data['post']
    fu = np.array(post, dtype=object)
    fu = fu.astype(str)

    z = count_vect.transform(fu.ravel())
    result = loaded_model.predict(z)

    dataset = pd.DataFrame({'post': fu, 'predection': result})
    dataset['predection'] = dataset.predection.map(
        {0: 'Politic', 1: 'ads', 2: 'eco', 3: 'food', 4: 'health', 5: 'porno', 6: 'religion', 7: 'sports', 8: 'tech', 9: 'tv'})

    # (dataset)
    print(type(dataset['predection']))
    return jsonify({"prediction": dataset['predection'][0]})


if __name__ == "__main__":
    app.run(debug=True)
