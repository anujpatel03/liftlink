"use client"
import RideSelector from "./RideSelector"
import { useContext, useState } from "react"
import { LiftContext } from "../../../context/liftContext"

const style = {
    wrapper: `flex-1 h-full flex flex-col justify-between`,
    rideSelectorContainer: `h-full flex flex-col overflow-scroll`,
    confirmButtonContainer: ` border-t-2 cursor-pointer z-10`,
    confirmButton: `bg-black text-white m-4 py-4 text-center text-xl`,
    loadingOverlay: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20`,
    loadingText: `text-white text-2xl`,
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
    const [loading, setLoading] = useState(false); // State for managing loading indicator


    const storeTripDetails = async (pickup, dropoff) => {
        
        if (selectedRide.length !== 0) {
            if (!window.ethereum) {
                alert(`Looks like you don't have a MetaMask extension!\nPlease install it to continue!`)
                return
            }
            setLoading(true);
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
                setLoading(false);
            }
            catch (error) {
                console.error(error);
                setLoading(false);
            }
        } else {
            alert("Please select a ride type")
        }
    }

    return (
        <div className={style.wrapper}>
        {loading && (
            <div className={style.loadingOverlay}>
                <div className={style.loadingText}>Redirecting to Metamask , Please wait...</div>
            </div>
        )}
        <div className={style.rideSelectorContainer}>
            {pickupCoordinates && dropoffCoordinates && <RideSelector />}
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