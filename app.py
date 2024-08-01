from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/basic_level')
def basic_level():
    return render_template('basic_level.html')

@app.route('/easy_level')
def easy_level():
    return render_template('easy_level.html')

@app.route('/hard_level')
def hard_level():
    return render_template('hard_level.html')

if __name__ == '__main__':
    app.run(debug=True)
