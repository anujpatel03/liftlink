export const tripSchema = {
    name: 'trips',
    type: 'document',
    title: 'Trips',
    fields: [
        {
            name: 'dropoff',    // Kaha drop karna hai
            type: 'string',
            title: 'Drop off',
        },
        {
            name: 'pickup',     // Kaha se pick karna hai
            type: 'string',
            title: 'Pick up',
        },
        {
            name: 'rideCategory',       // Konsi category ka ride hai
            type: 'string',
            title: 'Trip type',
        },
        {
            name: 'price',      // Kitna price hai
            type: 'number',
            title: 'Trip price',
        },
        {
            name: 'rideTimestamp',      // Kab ride kiya
            type: 'datetime',
            title: 'Trip timestamp',
        },
        {
            name: 'passenger',      // Kaun ride kar raha hai usaki details
            type: 'reference',
            title: 'Passenger',
            to: [{ type: 'users' }],
        },
        {
            name: 'status', // New field for status
            type: 'string',
            title: 'Trip status',
            options: {
                list: [
                    { title: 'Completed', value: 'completed' },
                    { title: 'Failed', value: 'failed' },
                ],
            },
        },
    ],
}