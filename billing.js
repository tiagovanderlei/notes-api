import stripePackage from "stripe";
import handler from './libs/handler-lib';
const calculateCost = require('./libs/billing-lib');

export const main = handler(async (event, context) => {
    const {storage, source} = JSON.parse(event.body);

    const amount = calculateCost(storage);

    const description = "Cobrança inicial";

    const stripe = stripePackage(process.env.stripeSecretKey);

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd"
    });

    return {status: true};

});