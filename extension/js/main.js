(function () {
  'use strict'

  let postButton
  let draftButton

  let breathCount
  let breathLength
  let breathPause

  let overlay
  let innerCircle

  function getBrowser () {
    if (window.chrome) {
      console.log('calm metafilter:', 'chrome browser')
      return window.chrome
    } else {
      console.log('calm metafilter:', 'firefox browser')
      return browser
    }
  }

  function loadSettings () {
    window.browser = getBrowser()

    window.browser.storage.local.get({
      'breathCount': 4,
      'breathLength': 3.5,
      'breathPause': 2
    }, function (res) {
      breathCount = parseInt(res.breathCount)
      breathLength = parseFloat(res.breathLength) * 1000
      breathPause = parseFloat(res.breathPause) * 1000
      console.log('calm metafilter:', 'count', breathCount, 'speed', breathLength, 'pause', breathPause)
    })

  }

  function setUpButtons () {
    postButton = document.getElementById('postButton')
    let buttonDiv = document.getElementById('lpdiv')
    draftButton = document.createElement('input')
    draftButton.type = 'button'
    draftButton.className = 'button'
    draftButton.value = "Breathe"
    draftButton.id = "draftButton"
    
    buttonDiv.insertBefore(draftButton, postButton)
  }

  function hideDraftButton () {
    console.log('calm metafilter:', 'hiding draft button')
    postButton.style.display = ''
    draftButton.style.display = 'none'
  }

  function showDraftButton () {
    console.log('calm metafilter:', 'showing draft button')
    postButton.style.display = 'none'
    draftButton.style.display = ''
  }

  function setUpAnimation () {
    overlay = document.createElement('div')
    overlay.id = 'metafilter-zen-overlay'

    innerCircle = document.createElement('div')
    innerCircle.id = 'metafilter-zen-circle-inner'

    let outerCircle = document.createElement('div')
    outerCircle.id = 'metafilter-zen-circle-outer'

    let circleContainer = document.createElement('div')
    circleContainer.id = 'metafilter-zen-circle-container'

    outerCircle.appendChild(innerCircle)
    circleContainer.appendChild(outerCircle)
    overlay.appendChild(circleContainer)
    document.body.appendChild(overlay)
  }

  function showOverlay () {
    overlay.style.display = 'block'
    document.body.style.setProperty('overflow', 'hidden')    
  }

  function hideOverlay () {
    overlay.style.display = 'none'
    document.body.style.setProperty('overflow', '')    
  }

  function runAnimation () {
    console.log('calm metafilter:', 'animation starting')
    showOverlay()
    const keyFrameOffset = breathPause / (2 * (breathPause + breathLength))

    let breathe = innerCircle.animate([{
      opacity: 0.2,
      transform: 'scale(0.2)',
      offset: 0.0
    },
    {
      opacity: 0.2,
      transform: 'scale(0.2)',
      offset: keyFrameOffset
    },
    {
      opacity: 0.8,
      transform: 'scale(0.9)',
      offset: 1.0 - keyFrameOffset
    },
    {
      opacity: 0.8,
      transform: 'scale(0.9)',
      offset: 1.0
    }
    ], {
      duration: breathPause + breathLength,
      easing: 'linear',
      direction: 'alternate',
      iterations: breathCount * 2
    })

    breathe.onfinish = function () {
      console.log('calm metafilter:', 'animation done')
      hideOverlay()
      hideDraftButton()
    }
  }

  let href = document.location.href

  if (href.match(/metafilter\.com\/[0-9]+\//)) {
    loadSettings()
    setUpButtons()
    showDraftButton()
    setUpAnimation()

    draftButton.addEventListener('click', function (evt) {
      runAnimation()
      hideDraftButton()
    })
  }

})()
