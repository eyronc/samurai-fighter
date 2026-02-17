import { useReducer } from 'react'

const startingState = {
    x: 0,             
    y: 0,             
    velocityY: 0,
    health: 100,
    isJumping: false,
    isBlocking: false,
    attackType: null,
    hitCooldown: 0,
}

function reducer(state, action) {
    switch (action.type) {

        case 'MOVE_LEFT':
            return { ...state, x: state.x - 4 }

        case 'MOVE_RIGHT':
            return { ...state, x: state.x + 4 }

        case 'JUMP':
            if (state.isJumping) return state  // can't jump in the air
            return { ...state, velocityY: -15, isJumping: true }

        case 'PUNCH':
            return { ...state, attackType: 'punch' }

        case 'KICK':
            return { ...state, attackType: 'kick' }

        case 'STOP_ATTACK':
            return { ...state, attackType: null }

        case 'BLOCK':
            return { ...state, isBlocking: action.payload } // true or false

        case 'GRAVITY':
            const newY = state.y + state.velocityY
            const landed = newY >= 420           // 420 = ground level
            return {
                ...state,
                y: landed ? 420 : newY,
                velocityY: landed ? 0 : state.velocityY + 0.8,
                isJumping: landed ? false : state.isJumping,
            }

        case 'TAKE_DAMAGE':
            const dmg = state.isBlocking ? action.payload * 0.1 : action.payload
            return {
                ...state,
                health: Math.max(0, state.health - dmg),
                hitCooldown: 500,
            }

        case 'TICK':
            return { ...state, hitCooldown: Math.max(0, state.hitCooldown - action.payload) }

        case 'RESET':
            return startingState

        default:
            return state
    }
}

function useFighterState(character, keys, side) {

    const [state, dispatch] = useReducer(reducer, {
        ...startingState,
        x: side === 'left' ? 100 : 600,
        health: character.maxHealth,
    })

    const update = (deltaTime) => {
        if (keys.left)  dispatch({ type: 'MOVE_LEFT' })
        if (keys.right) dispatch({ type: 'MOVE_RIGHT' })
        if (keys.up)    dispatch({ type: 'JUMP' })
        if (keys.punch) dispatch({ type: 'PUNCH' })
        if (keys.kick)  dispatch({ type: 'KICK' })

        dispatch({ type: 'BLOCK', payload: keys.block })
        dispatch({ type: 'GRAVITY' })

        if (state.hitCooldown > 0) {
            dispatch({ type: 'TICK', payload: deltaTime })
        }
    }

    const takeHit = (damage) => {
        if (state.hitCooldown > 0) return // iya i ignore ang hit, still in cooldown
        dispatch({ type: 'TAKE_DAMAGE', payload: damage })
    }

    return { state, update, takeHit }
}

export default useFighterState