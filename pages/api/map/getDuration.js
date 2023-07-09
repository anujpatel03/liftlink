const getDuration = async (req, res) => {
    const mapboxUrl = `${process.env.NEXT_PUBLIC_MAPBOX_DIRECTION_API_URL}/${req.body.pickupCoordinates};${req.body.dropoffCoordinates}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    // console.log(mapboxUrl)
    try {
      const response = await fetch(mapboxUrl)
      const data = await response.json()
      // console.log(data)
      const duration = (data.routes[0].duration) / 60     // in minutes
      const distance = (data.routes[0].distance) / 1000   // in km
      // console.log('duration : ', duration)
      // console.log('distance : ', distance)
      const bprice = (duration * 1) + (distance * 8)
      // console.log('bprice : ', bprice)
      res.status(200).send({ message: 'success', data: bprice })
    } catch (error) {
      res.status(500).send({ message: 'error', data: error.message })
    }
  }
  
  export default getDuration