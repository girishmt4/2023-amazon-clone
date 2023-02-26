import { buffer } from 'micro'
import * as admin from 'firebase-admin'

// Scure a connection to firebase from the backend
const serviceAccount = {
    "type": "service_account",
    "project_id": "amazn-clone-45b76",
    "private_key_id": `${process.env.PERMISSION_PRIVATE_KEY_ID}`,
    "private_key": `${process.env.PERMISSION_PRIVATE_KEY}`,
    "client_email": "firebase-adminsdk-ws5a7@amazn-clone-45b76.iam.gserviceaccount.com",
    "client_id": "112913292646183542964",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": `${process.env.CLIENT_CERT_URL}`
};

const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

// Establish a connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log("Fulfilling Order", session)

    return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
        amount: session.amount_total / 100,
        amount_shipping: session.total_details.amount_shipping / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to the Database`);
        })
}

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;

        // Verify that the event posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log('ERROR', error.mesasge)
            return res.status(400).send(`Webhook Error: ${error.message}`)
        }

        // Handle the Checkout Session Completed
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // fulfill the order
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch(error => res.status(400).send(`Webhook Error: ${error.message}`));
        } else {
            console.log(`Unhandled event type ${event.type}`);
        }
    }

};

export default handler;

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}