export const drawRect = (detections,ctx,ctx2) => {
    detections.forEach(prediction =>{
        const [x,y,width,height] = prediction['bbox'];
        const text = prediction['class'];
        const xCenter = ((width)/2)+ x;
        const yCenter = ((height)/2)+ y;
        //set styling
        const color = 'green'
        ctx.strokeStyle = color
        ctx.font = '18px Arial'
        ctx.fillStyle = color
        
        // draw rectangles and text 

        ctx.beginPath()
        ctx.fillText(text,x,y)
        ctx.rect(x,y,width,height)
        ctx.stroke()

        ctx.strokeStyle = 'red'
        ctx.fillStyle = 'red'
        ctx2.beginPath()
        ctx2.rect(xCenter,yCenter,10,10)
        ctx2.stroke()
    })
}