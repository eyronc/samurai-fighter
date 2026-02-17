import { useEffect, useRef } from 'react'

function useGameLoop(callback) {

    const savedCallback = useRef()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // start the loop
    useEffect(() => {
        const loop = () => {
            savedCallback.current()          
            requestAnimationFrame(loop)
        }

        const id = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(id)
    }, [])
}

export default useGameLoop