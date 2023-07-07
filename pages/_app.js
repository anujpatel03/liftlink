import '../src/app/globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { LiftProvider } from '../context/liftContext'

function MyApp({ Component, pageProps }) {
    return (
        <LiftProvider>
            <Component {...pageProps} />
        </LiftProvider>
    )
}

export default MyApp