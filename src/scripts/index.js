import '../styles/index.sass'

import Mouse from './mouse'
import Ball from './ball'

const
    CANVAS = document.getElementById( 'drawOnMe' ),
    CTX = CANVAS.getContext( '2d' ),
    POS = new Mouse( CANVAS )

let
    balls = [],
    mouse = new Ball( 0, 0, 40, 'purple' )


for ( let i = 0; i < 10; i++ ) {
    balls = [
        new Ball(
            200 + 100 * Math.cos( i * 2 * Math.PI / 10 ),
            200 + 100 * Math.sin( i * 2 * Math.PI / 10 ),
        ),
        ...balls
    ]
}

function connectDots() {
    CTX.beginPath()

    for ( let index = 0; index <= balls.length; index++ ) {
        let
            p0 = balls[
                index + 0 >= balls.length
                    ? index + 0 - balls.length
                    : index + 0
            ],
            p1 = balls[
                index + 1 >= balls.length
                    ? index + 1 - balls.length
                    : index + 1
            ]
        CTX.quadraticCurveTo( p0.x, p0.y, ( p0.x + p1.x ) * .5, ( p0.y + p1.y ) * .5 )
    }

    CTX.closePath()
    CTX.fill()
}


; ( function render() {
    // setTimeout( () => window.requestAnimationFrame( render ), 10 )
    window.requestAnimationFrame( render )

    CTX.clearRect( 0, 0, 600, 600 )

    mouse.setPos( POS.x, POS.y )
    mouse.draw( CTX )

    balls.forEach( ball => {
        ball.think( POS )
        ball.draw( CTX )
    } )
    connectDots()
} )()
