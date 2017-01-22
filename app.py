from flask import Flask, render_template, request
from elasticsearch import Elasticsearch

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/user/<cust_dim_nb>", methods=['GET'])
def run_get_json(cust_dim_nb):
    """
    Returns the json of the given customer id
    """
    host_name = "bdtcstr54n8.svr.us.jpmchase.net"
    port = 9201
    es = Elasticsearch(hosts=[{'host': host_name, 'port': port}])

    filt = {
            "filter": {
                "term": {
                    "customer.cust_dim_nb": cust_dim_nb
                    }
                }
            }
    results = es.search(body=filt)
    print(results)

    if len(results['hits']['hits']) > 1:
        print "Warning! More than one record found, returning only first."
    if len(results['hits']['hits']) == 0:
        print "No records found."
        return {}
    return str(results['hits']['hits'][0]['_source'])

if __name__ == "__main__":
    app.run(debug=True, port=5003)
