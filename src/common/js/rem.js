var html = document.querySelector('html')
html.style.fontSize = html.offsetWidth / 640 * 100 + 'px'
addEventListener('resize', function () {
  html.style.fontSize = html.offsetWidth / 640 * 100 + 'px'
}, false)
