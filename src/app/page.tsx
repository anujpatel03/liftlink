import Navbar from './components/Navbar'
import Map from './components/Map'
import LocationSelector from './components/LocationSelector'
import Confirm from './components/Confirm'
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the mapbox-gl.css file
import { LiftProvider } from '../../context/liftContext'


const style = {
  wrapper: `h-screen w-screen flex flex-col`,
  main: `h-full w-screen flex-1 z-10`,
  mapContainer: `flex-1 w-full h-full`,
  rideRequestContainer: `h-full w-[400px] ml-[1rem] py-[3rem] absolute top-[1.5rem] left-0 flex flex-col justify-end z-10`,
  rideRequest: `h-full max-h-[700px] bg-white rounded-lg flex flex-col overflow-scroll`,
}


export default function Home() {

  return (
    <LiftProvider>
    <div className={style.wrapper}>
      <Navbar />
      <div className={style.main}>
        <Map />   {/* Render the Map component only once */}
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          <LocationSelector />
          <Confirm />
        </div>
      </div>
    </div>
    </LiftProvider>
  )
}
