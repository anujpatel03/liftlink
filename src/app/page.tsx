import Navbar from './components/Navbar'
import Map from './components/Map'

const style = {
  wrapper: 'flex flex-col h-screen w-screen',
  main: '',
  rideRequestContainer: 'flex flex-col items-center justify-center flex-1 px-20 text-center',
  rideRequest: 'flex flex-col items-center justify-center flex-1 px-20 text-center',
}
export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar />
      {/* navbar */}
      <div className={style.main}>
        {/* map */}
        <Map />
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          {/* location selector */}
          {/* confirm ride */}


        </div>

      </div>
    </div>
  )
}
