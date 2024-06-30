"use client"
import { useState, useContext } from 'react'
import { LiftContext } from '../../../context/liftContext'

const style = {
    wrapper: `pt-2`,
    searchHeader: `w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden`,
    inputBoxes: `flex flex-col mb-4 relative`,
    inputBoxWrapper: `relative mx-4 mb-2`,
    inputBox: `h-10 border-2 bg-[#eeeeee] flex items-center my-1 py-1 px-2 w-full`,
    focusedInputBox: `border-black`,
    svgContainer: `mx-1`,
    input: `my-2 rounded-2 p-2 outline-none border-none bg-transparent h-full w-full`,
    suggestionsBox: `absolute bg-white border border-gray-300 z-10 w-full max-h-60 overflow-auto mt-1`,
    suggestionItem: `p-2 cursor-pointer hover:bg-gray-200`,
    verticalLine: `w-0 h-[2rem] border-black border absolute z-10 left-[2.3rem] top-[2rem]`,
}

const LocationSelector = () => {
    const [inFocus, setInFocus] = useState('from')
    const [suggestions, setSuggestions] = useState([])
    const { pickup, setPickup, dropoff, setDropoff } = useContext(LiftContext)

    const handleInputChange = async (e, type) => {
        const value = e.target.value
        type === 'from' ? setPickup(value) : setDropoff(value)

        if (value.length > 2) {
            const response = await fetch('api/map/getLocationCoordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location: value }),
            })
            const data = await response.json()
            setSuggestions(data.data.features.map(feature => feature.place_name))
        } else {
            setSuggestions([])
        }
    }

    const handleSuggestionClick = (suggestion, type) => {
        type === 'from' ? setPickup(suggestion) : setDropoff(suggestion)
        setSuggestions([])
    }

    return (
        <div className={style.wrapper}>
            <div className={style.searchHeader}>
                {inFocus === 'from' ? 'Where can we pick you up?' : 'Where to?'}
            </div>
            <div className={style.inputBoxes}>
                <div className={style.inputBoxWrapper}>
                    <div className={`${style.inputBox} ${inFocus === 'from' && style.focusedInputBox}`}>
                        <div className={style.svgContainer}>
                            <svg viewBox='0 0 24 24' width='1em' height='1em'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z'
                                />
                            </svg>
                        </div>
                        <input
                            className={style.input}
                            placeholder='Add a pickup location'
                            value={pickup}
                            onChange={(e) => handleInputChange(e, 'from')}
                            onFocus={() => setInFocus('from')}
                        />
                    </div>
                    {inFocus === 'from' && suggestions.length > 0 && (
                        <div className={style.suggestionsBox}>
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={style.suggestionItem}
                                    onClick={() => handleSuggestionClick(suggestion, 'from')}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className={style.verticalLine} />
                <div className={style.inputBoxWrapper}>
                    <div className={`${style.inputBox} ${inFocus === 'to' && style.focusedInputBox}`}>
                        <div className={style.svgContainer}>
                            <svg viewBox='0 0 24 24' width='1em' height='1em'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M14 10h-4v4h4v-4zM7 7v10h10V7H7z'
                                />
                            </svg>
                        </div>
                        <input
                            className={style.input}
                            placeholder='Enter your destination'
                            value={dropoff}
                            onChange={(e) => handleInputChange(e, 'to')}
                            onFocus={() => setInFocus('to')}
                        />
                    </div>
                    {inFocus === 'to' && suggestions.length > 0 && (
                        <div className={style.suggestionsBox}>
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className={style.suggestionItem}
                                    onClick={() => handleSuggestionClick(suggestion, 'to')}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LocationSelector
