const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const handler = async (req, res) => {
    const { items, email } = req.body;

    // console.log(items[0].title)

    const transformedItems = items.map((item) => ({

        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image]
            },
            unit_amount: Math.round(item.price * 100)
        },
        quantity: 1
    }));

    // console.log(transformedItems);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        // shipping_rates: ['shr_1MfUYOBKtpgXukP9eSkm0F6k'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA']
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: { amount: 499, currency: 'usd' },
                    display_name: 'Next Day Shipping',
                    delivery_estimate: {
                        minimum: { unit: 'business_day', value: 1 },
                        maximum: { unit: 'business_day', value: 3 },
                    }
                },
            }
        ],
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    });

    res.status(200).json({ id: session.id })

}

export default handler;