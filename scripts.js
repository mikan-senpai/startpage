/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"vBwToMs2Q8rcYsnw","label":"code","bookmarks":[{"id":"dPTAeiYBUxbFwLid","label":"youtube","url":"https://www.youtube.com/"},{"id":"rcajwluuohk9fbYp","label":"hackerrank","url":"https://www.hackerrank.com/dashboard"},{"id":"EzXM4lgZD87vGKkQ","label":"gmail","url":"https://mail.google.com/mail/u/0/#inbox"}]},{"id":"wqvJmrx0LMMOLE5S","label":"design tools","bookmarks":[{"id":"WjukH2mcBcqJYLfR","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"inCwxUCeOYryaPnA","label":"canva","url":"https://www.canva.com/en_in/"},{"id":"hLv4j60rorwW9eZi","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"cIb269lsFvidcyjT","label":"worth reading","bookmarks":[{"id":"T0agkKosfgucjs8E","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"ZecAOkVq2ZguGqQd","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"npMfqJ6if9WueRJq","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"Lq8AiEKfusg3eaC9","label":"sources","bookmarks":[{"id":"uqDUBoOWumRyuWA6","label":"icons","url":"https://feathericons.com/"},{"id":"RBbGpCuSZ6XARy1W","label":"@startpage","url":"https://github.com/mikan-senpai/startpage"},{"id":"podWbFUqlbh3WQVX","label":"author","url":"https://github.com/mikan-senpai/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
