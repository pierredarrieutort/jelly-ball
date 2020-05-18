export default class Mouse {
    constructor( canvas ) {
        this.x = 0
        this.y = 0
        const RECT = canvas.getBoundingClientRect()
        
        canvas.onmousemove = ( { clientX, clientY } ) => {
            this.x = clientX - RECT.left
            this.y = clientY - RECT.top
        }
    }
}
