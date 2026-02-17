import { useState, useEffect } from 'react'

function useKeyboard() {
    const [keys, setKeys] = useState({
        p1_left: false, p1_right: false, p1_up: false, p1_down: false,
        p1_punch: false, p1_kick: false, p1_block: false,
        p2_left: false, p2_right: false, p2_up: false, p2_down: false,
        p2_punch: false, p2_kick: false, p2_block: false,
    })

    const key_map = {
        'a': 'p1_left', 'd': 'p1_right', 'w': 'p1_up', 's': 'p1_down',
        'r': 'p1_punch', 't': 'p1_kick', 'y': 'p1_block',
        'ArrowLeft': 'p2_left', 'ArrowRight': 'p2_right',
        'ArrowUp': 'p2_up', 'ArrowDown': 'p2_down',
        '1': 'p2_punch', '2': 'p2_kick', '3': 'p2_block'
    }

    //switch on
    const handleKeyDown = (e) => {
        const key = key_map[e.key]
        if (key) setKeys(prev => ({ ...prev, [key]: true }))
    }

    //switch off
    const handleKeyUp = (e) => {
        const key = key_map[e.key]
        if (key) setKeys(prev => ({ ...prev, [key]: false }))
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return keys
}

export default useKeyboard;