(function () {
  'use strict'

  if (window.chrome) {
    window.browser = window.chrome
  } else {
    window.browser = browser
  }

  let saveOptions = function () {
    window.browser.storage.local.set({
      'breathCount': document.getElementById('breath-count').value,
      'breathLength': document.getElementById('breath-length').value,
      'breathPause': document.getElementById('breath-pause').value
    })
  }

  let restoreOptions = function () {
    window.browser.storage.local.get({
      'breathCount': 4,
      'breathLength': 3.5,
      'breathPause': 2
    }, function (settings) {
      document.getElementById('breath-count').value = settings.breathCount
      document.getElementById('breath-length').value = settings.breathLength
      document.getElementById('breath-pause').value = settings.breathPause
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    console.log('calm metafilter: loading options')
    restoreOptions()
  })

  let inputs = document.querySelectorAll('input')

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', function () {
      console.log('calm metafilter: inputs saved')
      saveOptions()
    })
  }
})()
