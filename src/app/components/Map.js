"use client";

import { useEffect} from 'react'
import mapboxgl from 'mapbox-gl'



const styles = {
    wrapper: `w-full h-full flex-1`,
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            // style: 'mapbox://styles/mapbox/streets-v11',
            style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
            center: [-74.5, 40],
            zoom: 9
        })
    }, [])


    return (
        <div className={styles.wrapper}>
            <div id="map" className="w-full h-full">
                <Map />
            </div>
        </div>
    )
}


export default Map

