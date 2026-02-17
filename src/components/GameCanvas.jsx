import useKeyboard from '../hooks/useKeyboard'
import useFighterState from '../hooks/useFighterState'
import useGameLoop from '../hooks/useGameLoop'
import { checkCollision } from '../utils/collision'
import { CHARACTER_1, CHARACTER_2 } from '../data/characters'
import { CONSTANT } from '../utils/constants'

function splitKeys(keys) {
    const p1Keys = {
        left:  keys.p1_left,
        right: keys.p1_right,
        up:    keys.p1_up,
        punch: keys.p1_punch,
        kick:  keys.p1_kick,
        block: keys.p1_block,
    }
    const p2Keys = {
        left:  keys.p2_left,
        right: keys.p2_right,
        up:    keys.p2_up,
        punch: keys.p2_punch,
        kick:  keys.p2_kick,
        block: keys.p2_block,
    }
    return { p1Keys, p2Keys }
}

function GameCanvas() {

    const keys = useKeyboard()
    const { p1Keys, p2Keys } = splitKeys(keys)

    const p1 = useFighterState(CHARACTER_1, p1Keys, 'left')
    const p2 = useFighterState(CHARACTER_2, p2Keys, 'right')

    useGameLoop(() => {
        p1.update()
        p2.update()
        checkCollision(p1, p2)
        checkCollision(p2, p1)
    })

    return (
        <div style={{
            width: CONSTANT.GAME_WIDTH,
            height: CONSTANT.GAME_HEIGHT,
            backgroundColor: 'black',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* player 1 */}
            <div style={{
                position: 'absolute',
                left: p1.state.x,
                top: p1.state.y,
                width: CONSTANT.FIGHTER_WIDTH,
                height: CONSTANT.FIGHTER_HEIGHT,
                backgroundColor: CHARACTER_1.color,
            }} />

            {/* player 2 */}
            <div style={{
                position: 'absolute',
                left: p2.state.x,
                top: p2.state.y,
                width: CONSTANT.FIGHTER_WIDTH,
                height: CONSTANT.FIGHTER_HEIGHT,
                backgroundColor: CHARACTER_2.color,
            }} />

        </div>
    )
}

export default GameCanvas