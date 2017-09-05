# Simple example of integration with GitHub, Stripe, and Twilio

## How to use:
##### 1. Create a BitScoop account and add these GitHub, Stripe, and Twilio API Maps.

These example maps are stripped down to simplify their functionality.

GitHub Quick Add:

[![Add to BitScoop](https://assets.bitscoop.com/github/AddBitScoopXSmall.png)](https://bitscoop.com/maps/create?source=https://raw.githubusercontent.com/bitscooplabs/simple_example/master/maps/github.json)

Twilio Quick Add:

[![Add to BitScoop](https://assets.bitscoop.com/github/AddBitScoopXSmall.png)](https://bitscoop.com/maps/create?source=https://raw.githubusercontent.com/bitscooplabs/simple_example/master/maps/twilio.json)

Stripe Quick Add:

[![Add to BitScoop](https://assets.bitscoop.com/github/AddBitScoopXSmall.png)](https://bitscoop.com/maps/create?source=https://raw.githubusercontent.com/bitscooplabs/simple_example/master/maps/stripe.json)

##### 2. Create a BitScoop API Key and add the key to the project's config file.

##### 3. Add the Map IDs, parameters, and authentication information to the config file.

Stripe's Secret Key should be appended with a colon in the form <secret_key>: and then base64 encoded.

Twilio's Account SID and Auth Token should be concatenated around a colon, in the form <account_sid>:<auth_token>, and then base64 encoded.

Authentication using a Connection to an OAuth2-backed service is beyond the scope of this demonstration.
More information about connections can be found [in our documentation](https://bitscoop.com/learn/connections).
We also have a [tutorial video](https://www.youtube.com/watch?v=O1c9KBjWdlQ) showing how to set up and use connections.
You can also view and run other demonstration projects that involve creating Connections such as our [Alexa Demo](https://github.com/bitscooplabs/bitscoop-alexa-demo).

##### 4. Run the app.
~~~
yarn install
node app.js
~~~

##### 5. Make calls to the application server

~~~
curl -X GET \
  http://localhost:8080/<service>/<endpoint> \
~~~

Note that the endpoint and service names are case sensitive.
Also note that the endpoint defined in the Twilio map is called via a POST instead of a GET.
