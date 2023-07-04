import liftBlack from '../images/liftBlack.png'
import liftBlackSuv from '../images/liftBlackSuv.png'
import liftSelect from '../images/liftSelect.png'
import liftX from '../images/liftX.png'
import liftXL from '../images/liftXL.png'
import ethLogo from '../images/eth-logo.png'
import Image from 'next/image'

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

const carList = [
    {
        service: 'LiftX',
        imageURL: liftX,
        priceMultiplier: 1,
    },
    {
        service: 'LiftXL',
        imageURL: liftXL,
        priceMultiplier: 1.2,
    },
    {
        service: 'LiftSelect',
        imageURL: liftSelect,
        priceMultiplier: 1.5,
    },
    {
        service: 'LiftBlack',
        imageURL: liftBlack,
        priceMultiplier: 1.75,
    },
    {
        service: 'LiftBlackSuv',
        imageURL: liftBlackSuv,
        priceMultiplier: 2,
    },
]

const basePrice = 1542
const RideSelector = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.title}> Choose a Ride, or swipe up for more </div>
            <div className={style.carList}>
                {
                    carList.map((car, index) => {
                        return (
                        <div className={style.car} key={index}>
                            <Image
                                className={style.carImage}
                                src={car.imageURL}
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