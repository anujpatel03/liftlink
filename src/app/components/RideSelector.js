import Image from 'next/image'
import ethLogo from '../images/eth-logo.png'
import { useEffect, useState, useContext } from 'react'
import { LiftContext } from '../../../context/liftContext'

const style = {
    wrapper: `h-full flex flex-col`,
    title: `text-gray-500 text-center text-xs py-2 border-b`,
    carList: `flex flex-col flex-1 overflow-scroll`,
    car: `flex p-3 m-2 items-center border-2 border-white`,
    selectedCar: `border-2 border-black flex p-3 m-2 items-center`,
    carImage: `h-14`,
    carDetails: `ml-2 flex-1`,
    service: `font-medium`,
    time: `text-xs text-blue-500`,
    priceContainer: `flex items-center`,
    price: `mr-[-0.8rem]`,
}


const RideSelector = () => {
    const [carList, setCarList] = useState([]);  // Setting up carList state
    const { selectedRide, setSelectedRide, setPrice, basePrice } = useContext(LiftContext)
    console.log("baseprice : ",basePrice)
    useEffect(() => {
        ; (async () => {
            try {
                const response = await fetch('/api/db/getRideTypes')  // Getting data from sanity
                const data = await response.json()
                setCarList(data.data)       // Setting up carList state
                setSelectedRide(data.data[0])
            }
            catch (error) {
                console.log(error)      // Catching error if any
            }
        })()
    }, [])

    return (
        <div className={style.wrapper}>
            <div className={style.title}> Choose a Ride, or swipe up for more </div>
            <div className={style.carList}>
                {carList.map((car, index) => {
                    return (
                        <div key={index}
                            className={`${selectedRide.service === car.service
                                    ? style.selectedCar
                                    : style.car
                            }`}
                            onClick={() => {
                                setSelectedRide(car)
                                setPrice(((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5))
                            }}

                        >
                            <Image
                                className={style.carImage}
                                src={car.iconURL}
                                alt={car.service}
                                height={50}
                                width={50}
                            />
                            <div className={style.carDetails}>
                                <div className={style.service}> {car.service} </div>
                                <div className={style.time}> 5 min away </div>
                            </div>
                            <div className={style.priceContainer}>
                                <div className={style.price}>
                                    {((basePrice / 10 ** 5) * car.priceMultiplier).toFixed(5)}  {/* Calculating price in etherium */}
                                </div>
                                <Image src={ethLogo} alt="eth-logo" height={25} width={40} />
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
}

export default RideSelector