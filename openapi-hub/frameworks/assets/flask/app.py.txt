from flask import Flask
from flask_smorest import Api
from db import db
import models
from resources import blp as BookBlueprint
import yaml

app = Flask(__name__)
app.config["API_TITLE"] = "Library API"
app.config["API_VERSION"] = "v0.0.1"
app.config["OPENAPI_VERSION"] = "3.1.0"
app.config["OPENAPI_DESCRIPTION"] = "A simple library API"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database-file.db"
app.config["API_SPEC_OPTIONS"] = {"x-speakeasy-retries": {
        'strategy': 'backoff',
        'backoff': {
            'initialInterval': 500,
            'maxInterval': 60000,
            'maxElapsedTime': 3600000,
            'exponent': 1.5,
        },
        'statusCodes': ['5XX'],
        'retryConnectionErrors': True,
    }
}


db.init_app(app)
api = Api(app)
api.register_blueprint(BookBlueprint)

# Add server information to the OpenAPI spec
api.spec.options["servers"] = [
    {
        "url": "http://127.0.0.1:5000",
        "description": "Local development server"
    }
]

# Serve OpenAPI spec document endpoint for download
@app.route("/openapi.yaml")
def openapi_yaml():
    spec = api.spec.to_dict()
    return app.response_class(
        yaml.dump(spec, default_flow_style=False),
        mimetype="application/x-yaml"
    )

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # Create database tables
    app.run(debug=True)
