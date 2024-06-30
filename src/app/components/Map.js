"use client";
import { useEffect, useContext,useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { LiftContext } from '../../../context/liftContext'  // Importing the context object
import { FaSpinner } from 'react-icons/fa';

const style = {
    wrapper: `flex-1 h-full w-full`,
    loadingContainer: `absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-10`,
    spinner: `animate-spin h-10 w-10 text-white`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
    const { pickupCoordinates, dropoffCoordinates } = useContext(LiftContext) // Getting the context object
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [81.8583,25.4991],
            // center: [79.894227, 36.323348],
            zoom: 3
        })
        map.on('load', () => {
            setLoading(false)  // Set loading to false when the map is fully loaded
        })
        if (pickupCoordinates) addToMap(map, pickupCoordinates) // This is the function we created to add the marker to the map
        if (dropoffCoordinates) addToMap(map, dropoffCoordinates)      
        if (pickupCoordinates && dropoffCoordinates) {
            map.fitBounds([dropoffCoordinates, pickupCoordinates], {    // This is the mapbox method to fit the map to the coordinates
                padding: { top: 50, bottom: 50, left: 50, right: 50 },
            })
        }

    }, [pickupCoordinates, dropoffCoordinates]) // This is the dependency array. The map will re-render if the coordinates change


    const addToMap = (map, coordinates) => {    
        const marker1 = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)
    }

    return (
        <div className={style.wrapper}>
        {loading && (
            <div className={style.loadingContainer}>
                <FaSpinner className={style.spinner} />
            </div>
        )}
        <div id='map' style={{ height: '100%', width: '100%' }} />
    </div>
    )
}


export default Map
