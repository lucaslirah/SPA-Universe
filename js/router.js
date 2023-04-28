let navLinks = document.querySelectorAll('.nav-link');
let navLinkElement = Array.prototype.filter.call(navLinks, function(navElement) {
  return navElement.nodeName === 'A';
});

export class Router{
  routes = {}

  add(routeName, page){
    this.routes[routeName] = page
  }

  route(event){
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle(){
    const {pathname} = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })

    this.selectLinkNav(pathname)
  }

  selectLinkNav(pathname){
    if (pathname === '/') {
      navLinkElement[0].classList.add('selected')
      navLinkElement[1].classList.remove('selected')
      navLinkElement[2].classList.remove('selected')
      document.querySelector('body').style.backgroundImage = "url('./assets/home-bg.png')"
    }
    if (pathname === '/universe') {
      navLinkElement[1].classList.add('selected')
      navLinkElement[0].classList.remove('selected')
      navLinkElement[2].classList.remove('selected')
      document.querySelector('body').style.backgroundImage = "url('./assets/universe-bg.png')"
    }
    if (pathname === '/exploration') {
      navLinkElement[2].classList.add('selected')
      navLinkElement[0].classList.remove('selected')
      navLinkElement[1].classList.remove('selected')
      document.querySelector('body').style.backgroundImage = "url('./assets/exploration-bg.png')"
    }
  }
}