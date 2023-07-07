const getLocationCoordinates = async (req, res) => {
    const mapboxUrl = `${process.env.NEXT_PUBLIC_MAPBOX_PLACES_API_URL}/${req.body.location}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    try {
        const mapboxResponse = await fetch(mapboxUrl);
        const mapboxResponseJson = await mapboxResponse.json();
        res.status(200).send({ message: 'success', data: mapboxResponseJson.features[0].center });
    }
    catch (error) {
        res.status(500).send({ message: 'error', data: error.message })
    }
}

export default getLocationCoordinates