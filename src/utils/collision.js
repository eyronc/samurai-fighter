import { CONSTANT } from '../utils/constants'

// are two boxes touching?
function isOverlapping(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width  &&  // rect1 not too far right
        rect1.x + rect1.width > rect2.x  &&  // rect1 not too far left
        rect1.y < rect2.y + rect2.height &&  // rect1 not too far down
        rect1.y + rect1.height > rect2.y     // rect1 not too far up
    )
    // all 4 must be true = they are overlapping
}

// asa mutugpa ang sumbag or patid
function getHitbox(fighter, attackType) {
    if (!attackType) return null  // way hitbox if di mu attack

    const reach = attackType === 'kick' ? 60 : 50

    return {
        // if ni face sa right, hitbox is in right
        // if ni face sa left,  hitbox is in left
        x: fighter.facingRight
            ? fighter.x + CONSTANT.FIGHTER_WIDTH  // right side
            : fighter.x - reach,                  // left side

        y: fighter.y + 20,   // default location: 20px below top of fighter
        width: reach,        // range of the attack
        height: 40,         
    }
}

// where is the body? (the area that can receive a hit)
function getHurtbox(fighter) {
    return {
        x: fighter.x,                    // same x as  fighter
        y: fighter.y,                    // same y as fighter
        width: CONSTANT.FIGHTER_WIDTH,   // same width as fighter
        height: CONSTANT.FIGHTER_HEIGHT, // same height as fighter
    }
}

function checkCollision(attacker, defender) {
    const hitbox = getHitbox(attacker.state, attacker.state.attackType)
    const hurtbox = getHurtbox(defender.state)

    if (!hitbox) return

    if (isOverlapping(hitbox, hurtbox)) {
        const damage = attacker.state.attackType === 'kick' ? 15 : 10
        defender.takeHit(damage)
    }
}

export { checkCollision }