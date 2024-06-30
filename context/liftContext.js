"use client"
import { createContext, useState, useEffect } from 'react'
import { faker } from '@faker-js/faker'     // This will generate fake name

export const LiftContext = createContext()  // Creating a context object

export const LiftProvider = ({ children }) => {
    const [pickup, setPickup] = useState('')
    const [dropoff, setDropoff] = useState('')
    const [pickupCoordinates, setPickupCoordinates] = useState()
    const [dropoffCoordinates, setDropoffCoordinates] = useState()
    const [currentAccount, setCurrentAccount] = useState()
    const [currentUser, setCurrentUser] = useState([])
    const [selectedRide, setSelectedRide] = useState([])
    const [price, setPrice] = useState()
    const [basePrice, setBasePrice] = useState()
    const [loading, setLoading] = useState(false)  // Add loading state
    // const [suggestedLocation, setSuggestedLocation] = useState()  // This will store the suggested location

    let metamask

    if (typeof window !== 'undefined') {
        metamask = window.ethereum
    }

    useEffect(() => {       // This useEffect checks that wallet is connected or not
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {           // This useEffect check if there is no currentAccount then return if there is then return currentUserInfo
        if (!currentAccount) return
        requestToGetCurrentUsersInfo(currentAccount)
    }, [currentAccount])

    useEffect(() => {   // useEffect for getting duration
        let isMounted = true; // Add a variable to track mounted state
        if (!pickupCoordinates || !dropoffCoordinates) return
            ; (async () => {
                try {
                    const response = await fetch('/api/map/getDuration', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            pickupCoordinates: `${pickupCoordinates[0]},${pickupCoordinates[1]}`,
                            dropoffCoordinates: `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`,
                        }),
                    })

                    const data = await response.json()
                    // console.log('setbasePrice ', data)
                    // 0.0000065
                    if (isMounted) { // Check if the component is still mounted before updating state
                        setBasePrice(Math.round(data.data));
                    }
                    return () => {
                        isMounted = false;
                    };
                    // setBasePrice((Math.round(await data.data))/60)
                } catch (error) {
                    console.error(error)
                }
            })()
    }, [pickupCoordinates, dropoffCoordinates])

    const checkIfWalletIsConnected = async () => {  // This function checks if the user has metamask installed and connected
        if (!window.ethereum) return
        setLoading(true)
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_accounts',
            })

            if (addressArray.length > 0) {
                setCurrentAccount(addressArray[0])
                requestToCreateUserOnSanity(addressArray[0])
            }
        } catch (error) {
            console.error(error)
        }
        finally
        {
            setLoading(false)
        }
    }

    const connectWallet = async () => {     // This funtion connects wallet
        if (!window.ethereum) {
            alert(`Looks like you don't have a MetaMask extension!\nPlease install it to continue!`)
            return
        }
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })

            if (addressArray.length > 0) {
                setCurrentAccount(addressArray[0])
                requestToCreateUserOnSanity(addressArray[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const createLocationCoordinatePromise = (locationName, locationType) => {
        return new Promise(async (resolve, reject) => {
            try {

                const response = await fetch('api/map/getLocationCoordinates', {    // This is the API route we created in pages/api/map/getLocationCoordinates.js
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        location: locationName,
                    }),
                })

                const responseData = await response.json()
                console.log('responseData : ', responseData)
                // setSuggestedLocation(responseData.data.features[0].place_name);  // This will set the suggested location
                const data = responseData.data.features[0].center
                console.log('data : ', data)
                // features[0].center
                if (responseData.message === 'success') {
                    switch (locationType) {
                        case 'pickup':
                            setPickupCoordinates(data)
                            break
                        case 'dropoff':
                            setDropoffCoordinates(data)
                            break
                    }
                    resolve()
                } else {
                    reject()
                }
            } catch (error) {
                console.error(error)
                reject()
            }
        })
    }

    useEffect(() => {
        if (pickup && dropoff) {
            ; (async () => {
                await Promise.all([
                    createLocationCoordinatePromise(pickup, 'pickup'),
                    createLocationCoordinatePromise(dropoff, 'dropoff'),
                ])
            })()
        } else return
    }, [pickup, dropoff])

    const requestToCreateUserOnSanity = async address => {  // This function creates a new user on Sanity
        if (!window.ethereum) return    // Not login into metamask then return
        try {
            await fetch('/api/db/createUser', {     // fetch this route for creating user in sanity
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userWalletAddress: address,
                    name: faker.person.fullName(),
                }),
            })
        } catch (error) {
            console.error(error)
        }
    }

    const requestToGetCurrentUsersInfo = async walletAddress => {
        try {
            const response = await fetch(
                `/api/db/getUserInfo?walletAddress=${walletAddress}`,
            )

            const data = await response.json()
            setCurrentUser(data.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <LiftContext.Provider
            value={{        // All these variables can be access to anywhere to the app
                pickup,
                setPickup,
                dropoff,
                setDropoff,
                pickupCoordinates,
                setPickupCoordinates,
                dropoffCoordinates,
                setDropoffCoordinates,
                connectWallet,
                currentAccount,
                currentUser,
                selectedRide,
                setSelectedRide,
                price,
                setPrice,
                basePrice,
                metamask,
                loading,
            }}
        >
            {children}
        </LiftContext.Provider>
    )
}