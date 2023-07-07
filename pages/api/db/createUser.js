import { client } from '../../../lib/sanity'

const createUserInSanity = async (req, res) => {
    try {
        const userDoc = {   // Defining userDoc with below parameters
            _type: 'users',
            _id: req.body.userWalletAddress,
            name: req.body.name,
            walletAddress: req.body.userWalletAddress,
        }

        await client.createIfNotExists(userDoc)     // If not exist then create

        res.status(200).send({ message: 'success' })
    } catch (error) {
        res.status(500).send({ message: 'error', data: error.message })
    }
}

export default createUserInSanity