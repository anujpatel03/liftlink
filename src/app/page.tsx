import Navbar from './components/Navbar'
import dynamic from "next/dynamic";
import Map from './components/Map'

const style = {
  wrapper: 'flex flex-col h-screen w-screen',
  main: '',
  rideRequestContainer: 'flex flex-col items-center justify-center flex-1 px-20 text-center',
  rideRequest: 'flex flex-col items-center justify-center flex-1 px-20 text-center',
}
export default function Home() {
  // const MapWithNoSSR = dynamic(() => import("./components/Map"), {
  //   ssr: false
  // });

  return (
    <div className={style.wrapper}>
      <Navbar />
      {/* navbar */}
      <div className={style.main}>
        {/* map */}
        <Map />
        {/* <MapWithNoSSR /> */}
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
