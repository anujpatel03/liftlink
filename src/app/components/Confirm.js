"use client"
import RideSelector from "./RideSelector"
import { useContext } from "react"
import { LiftContext } from "../../../context/liftContext"

const style = {
    wrapper: `flex-1 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
}

const Confirm = () => {
    const {
        currentAccount,
        pickup,
        dropoff,
        price,
        selectedRide,
        pickupCoordinates,
        dropoffCoordinates,
        metamask,
    } = useContext(LiftContext);
    // console.log("price : ", price);

    const storeTripDetails = async (pickup, dropoff) => {
        if (selectedRide.length !== 0) {
            try {
                await fetch('api/db/saveTrips', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pickupLocation: pickup,
                        dropoffLocation: dropoff,
                        userWalletAddress: currentAccount,
                        price: price,
                        selectedRide: selectedRide,
                    }),
                })

                await metamask.request({
                    method: 'eth_sendTransaction',
                    params: [
                        {
                            from: currentAccount,
                            to: process.env.NEXT_PUBLIC_LIFTLINK_ADDRESS,
                            gas: '0x7EF40', // 520000 Gwei ( If a transaction exceeds the gas limit, it will fail and any changes made during the transaction will be reverted.)
                            value: Number(price * 1e18).toString(16)
                        },
                    ],
                })
            }
            catch (error) {
                console.error(error);
            }
        } else {
            alert("Please select a ride")
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.rideSelectorContainer}>
                {
                    pickupCoordinates && dropoffCoordinates && <RideSelector />
                }
            </div>
            <div className={style.confirmButtonContainer}>
                <div className={style.confirmButtonContainer}>
                    <div
                        className={style.confirmButton}
                        onClick={() => { storeTripDetails(pickup, dropoff) }}
                    >
                        Confirm {selectedRide.service || 'Ride'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm