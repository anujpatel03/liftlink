export const ridesSchema = {
    name: 'rides',
    title: 'Rides',
    type: 'document',
    fields: [
      {
        name: 'orderById',      // Order by id
        title: 'Order by Id',
        type: 'number',
      },
      {
        name: 'title',          // Title
        title: 'Title',
        type: 'string',
      },
      {
        name: 'priceMultiplier',        // Price multiplier
        title: 'Price Multiplier',
        type: 'number',
      },
      {
        name: 'icon',       // Icon
        title: 'Icon',
        type: 'image',
      },
    ],
  }