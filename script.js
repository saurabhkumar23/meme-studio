// canvas attributes
let cWidth = 700
let cHeight = 350
let img
let text1 = 'Text1'
let text2 = 'Text2'
let fontColor = 'black'
let fontWeight = 'normal'
let fontSize = '40'
let fontStyle = 'Sans-Serif'
let text1_X = 10
let text1_Y = 60
let text2_X = 150
let text2_Y = 60
let overlay = 'transparent'
let opacity = 0;

// init call
// update canvases width and height
for(let i=0;i<canvases.length;i++){
    canvases[i].height = cHeight
    canvases[i].width = cWidth
}
updateCanvas()

// aspect ratio
aspectRatioInput.addEventListener('change', function (e) {
    let ratio = e.target.value
    if (ratio == 'wide') {
        cWidth = 700
        cHeight = 350
    } else {
        cWidth = 400
        cHeight = 400
    }
    // update range for text alignment
    text1HRange.max = cWidth
    text1VRange.max = cHeight
    text2HRange.max = cWidth
    text2VRange.max = cHeight
    // update canvases width and height
    for(let i=0;i<canvases.length;i++){
        canvases[i].height = cHeight
        canvases[i].width = cWidth
    }
    // update canvas
    updateCanvas()
})

// image
inputImage.addEventListener('change', function (e) {
    // get image
    let imageData = e.target.files[0]
    img = new Image()
    // set url
    img.src = URL.createObjectURL(imageData)
    img.onload = () => {
        // update canvas
        updateCanvas()
    }
})

// text1
textAreaInput1.addEventListener('keyup', function (e) {
    // set text1
    text1 = e.target.value
    // update canvas
    updateCanvas()
})

// text2
textAreaInput2.addEventListener('keyup', function (e) {
    // set text2
    text2 = e.target.value
    // update canvas
    updateCanvas()
})

// font size
textSizeInput.addEventListener('change', function (e) {
    // set font size
    fontSize = e.target.value
    // update canvas
    updateCanvas()
})

// font weight
textWeightInput.addEventListener('change', function (e) {
    // set font weight
    fontWeight = e.target.value
    // update canvas
    updateCanvas()
})

// font style
textStyleInput.addEventListener('change', function (e) {
    // set font style
    fontStyle = e.target.value
    //  update canvas
    updateCanvas()
})

// font color
textColorInput.addEventListener('change', function (e) {
    // set color
    fontColor = e.target.value
    // set border color on UI
    document.querySelector('.text-color').style.borderBottom = '3px solid ' + fontColor
    // update canvas
    updateCanvas()
})

// hor text1 alignment
text1HRange.addEventListener('change', function (e) {
    // set x
    text1_X = e.target.value
    //  update canvas
    updateCanvas()
})

// ver text1 alignment
text1VRange.addEventListener('change', function (e) {
    // set y
    text1_Y = e.target.value
    //  update canvas
    updateCanvas()
})

// hor text2 alignment
text2HRange.addEventListener('change', function (e) {
    // set x
    text2_X = e.target.value
    //  update canvas
    updateCanvas()
})

// ver text2 alignment
text2VRange.addEventListener('change', function (e) {
    // set y
    text2_Y = e.target.value
    //  update canvas
    updateCanvas()
})

// overlay
for (let i = 0; i < bgOverlayInputs.length; i++) {
    bgOverlayInputs[i].addEventListener('change', function (e) {
        // set overlay
        overlay = e.target.value
        // update canvas
        updateCanvas()
    })
}

// opacity
opacityInput.addEventListener('change', function (e) {
    // set opacity
    opacity = e.target.value
    // update canvas
    updateCanvas()
})

// **************************************************************************** //
// main call for canvas update
// **************************************************************************** //
function updateCanvas() {
    // update canvas
    updateImageCanvas()
    updateOverlayCanvas()
    updateTextCanvas()
    // update mainbuffer canvas
    updateBufferCanvas()
}

// image canvas update
function updateImageCanvas() {
    // set bg image
    if (img) {
        toolImage.drawImage(img, 0, 0, canvasImage.width, canvasImage.height)
    }
}

// overlay canvas update
function updateOverlayCanvas() {
    // set opacity
    toolOverlay.globalAlpha = opacity
    // set overlay
    toolOverlay.fillStyle = overlay
    toolOverlay.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height)
}

// text canvas update
function updateTextCanvas() {
    // set font color
    toolText.fillStyle = fontColor
    // set font 
    toolText.font = fontWeight + ' ' + fontSize + 'px' + ' ' + fontStyle
    // set text1
    toolText.fillText(text1, text1_X, text1_Y)
    // set text2
    toolText.fillText(text2,text2_X,text2_Y)
}

// buffer canvas update
function updateBufferCanvas() {
    // 1. image
    if (img) {
        toolBuffer.drawImage(img, 0, 0, canvasBuffer.width, canvasBuffer.height)
    }
    // 2. overlay
    toolBuffer.globalAlpha = opacity
    toolBuffer.fillStyle = overlay
    toolBuffer.fillRect(0, 0, canvasBuffer.width, canvasBuffer.height)
    // 3. text
    toolBuffer.globalAlpha = 1
    toolBuffer.fillStyle = fontColor
    toolBuffer.font = fontWeight + ' ' + fontSize + 'px' + ' ' + fontStyle
    toolBuffer.fillText(text1, text1_X, text1_Y)
    toolBuffer.fillText(text2,text2_X,text2_Y)
}

// download canvas
downloadBtn.addEventListener('click', function () {
    let url = canvasBuffer.toDataURL() // canvas give url of drawing image
    let a = document.createElement('a') // <a download="file.png" href="url"></a>
    a.download = 'file.jpg'
    a.href = url
    a.click()
    a.remove()
})

// full screen feature
canvasExpandIcon.addEventListener('click', function () {
    canvasBuffer.requestFullscreen()
})

// speech to text
mikeIcon[0].addEventListener('click',function(){
    if (isSpeakModeOn) {
        recognition1.stop(); // speak done
        mikeIcon[0].style.color = 'white'

    } else {
        recognition1.start(); // speak now
        mikeIcon[0].style.color = '#dd0a0a'
    }
    isSpeakModeOn = !isSpeakModeOn
})

mikeIcon[1].addEventListener('click', function () {
    if (isSpeakModeOn) {
        recognition2.stop(); // speak done
        mikeIcon[1].style.color = 'white'

    } else {
        recognition2.start(); // speak now
        mikeIcon[1].style.color = '#dd0a0a'
    }
    isSpeakModeOn = !isSpeakModeOn
})

// get speech result
recognition1.onresult = function (event) {
    let current = event.resultIndex
    let transcript = event.results[current][0].transcript
    // set text1
    text1 += transcript
    // set text on textarea
    textAreaInput1.value = text1
    // update canvas
    updateCanvas()
};

recognition2.onresult = function (event) {
    let current = event.resultIndex
    let transcript = event.results[current][0].transcript
    // set text2
    text2 += transcript
    // set text on textarea
    textAreaInput2.value = text2
    // update canvas
    updateCanvas()
};