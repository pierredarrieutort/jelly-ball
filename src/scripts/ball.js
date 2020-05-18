export default class Ball {
    constructor( x = 0, y = 0, radius = 5, color = 'orange' ) {
        this.x = this.originalX = x
        this.y = this.originalY = y
        this.vx = 0
        this.vy = 0
        this.radius = radius
        this.color = color
        this.friction = .7
        this.springFactor = .05
    }

    setPos( x, y ) {
        this.x = x
        this.y = y
    }

    think( mouse ) {
        let
            dx = this.x - mouse.x,
            dy = this.y - mouse.y,
            dist = Math.sqrt( dx ** 2 + dy ** 2 )

        //interaction
        if ( dist < 40 ) {
            let
                angle = Math.atan2( dy, dx ),
                tx = mouse.x + Math.cos( angle ) * 40,
                ty = mouse.y + Math.sin( angle ) * 40
            
            this.vx += tx - this.x
            this.vy += ty - this.y
        }

        //spring back
        let
            dx1 = -(this.x - this.originalX),
            dy1 = -(this.y - this.originalY)
        
        this.vx += dx1 * this.springFactor
        this.vy += dy1 * this.springFactor

        //friction
        this.vx *= this.friction
        this.vy *= this.friction
        
        //actual move
        this.x += this.vx
        this.y += this.vy
    }

    draw( ctx ) {
        ctx.save()
        ctx.beginPath()
        ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI )
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
}
