import config from '../wyConfigs'

const pageMap = {
  'login': config.loginUrl,
  'regist': config.registUrl,
}

var scrollTimer = null

var page = {
  // 切换页面，并错误提示
  turnPage: (message, url) => {
    if (message) {
      alert(message)
    }
    if (url) {
      if (pageMap[url]) {
        url = pageMap[url]
      }
      window.location.href = url
    }
  },
  // 滚动聊天列表到底部
  scrollChatListDown: (pos, initCount) => {
    let dom = document.getElementById('chat-list')
    if (!dom) {
      return
    }
    let maxCount = 5
    initCount = initCount || 1
    if (typeof pos !== 'number') {
      pos = Math.max(dom.scrollHeight - dom.clientHeight, 888888)
    }
    dom.scrollTop = pos
    if ((dom.scrollTop < pos) && (initCount < maxCount)) {
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        initCount++
        page.scrollChatListDown(pos, initCount)
      }, 200)
    }
  },
  getChatListHeight: () => {
    return document.getElementById('chat-list').scrollHeight
  },
  getChatListScroll: () => {
    return document.getElementById('chat-list').scrollTop
  },
}

export default page
