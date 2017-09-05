'use strict';

const BitScoop = require('bitscoop-sdk');
const config = require('config');

const bitscoop = new BitScoop(config.bitscoop.api_key);


let sqs = bitscoop.map(config.maps.sqs_id);
let stripe = bitscoop.map(config.maps.stripe_id);
let twilio = bitscoop.map(config.maps.twilio_id);

let messageId;
let accountSid = '0123';
let queueUrl = 'a1b2';


(async function() {
	let messageData = await sqs.endpoint('SendMessage').method('GET')({
		query: {
			message_body: 'Sending a test message via SQS',
			message_group_id: '1234',
			queue_url: queueUrl
		}
	});

	let queueAttr = await sqs.endpoint('GetQueueAttributes').method('GET')({
		query: {
			queue_url: queueUrl
		}
	});

	let stripeAccount = await stripe.endpoint('Accounts').method('POST')({
		body: {
			email: 'demo@example.com',
			type: 'standard'
		}
	});

	let updatedAccount = await stripe.endpoint('Accounts').method('PATCH')({
		identifier: stripeAccount.id,
		body: {
			business_name: 'Example Business',
			charges_enabled: true
		}
	});

	let twilioData = await twilio.endpoint('SendMessage').method('GET')({
		identifier: accountSid
	});

	let message = await twilio.endpoint('GetMessage').method('GET')({
		identifier: twilioData.MessageSid,
		query: {
			account_sid: accountSid
		}
	});
});
