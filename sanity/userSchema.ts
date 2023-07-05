export const userSchema = {
    name: 'users',
    type: 'document',
    title: 'Users',
    fields: [
        {
            name: 'name',       // user ka name
            type: 'string',
            title: 'Name',
        },
        {
            name: 'walletAddress',      // user ka wallet address
            type: 'string',
            title: 'Wallet Address',
        },
        {
            name: 'profileImage',       // user ka profile image
            type: 'image',
            title: 'Profile Image',
        },
    ],
}