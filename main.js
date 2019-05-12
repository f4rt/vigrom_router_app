const ITEMS_LIST = {

  items: { 
    i1: {
      name: "item1",
      quantity: 1,
      price: 20
    }, 
    i2: {
      name: "item2",
      quantity: 5,
      price: 5
    }, 
    i3: {
      name: "item3",
      quantity: 3,
      price: 30
    },
  },

  total: 3 
};

let root = document.querySelector('#root')

// классы роутера и страницы
class Router{
  constructor(...routes){
    this.routes = routes
    this.history = []
  }

  selectRoute(hash) {
    this.routes.forEach(route => {
      if (route.url === hash){
        route.page.show(root)
      }
    })
  }

  updHistory(hash) {
    this.history.push(hash)
    if (this.history.length > 10) {
      this.history.shift()
    }
    console.log(this.history)
  }

  checkHash(newHash) {
    this.selectRoute(newHash)
    this.updHistory(newHash)
  }

}

class Page {
  constructor(template) {
    this.template = template
  }

  show(el) {
    el.innerHTML = this.template
  }

}

// создаем шаблоны страниц и сами страницы
  // шаблоны
let backButton = '<button onclick="prevPage()">Назад</button>'
let menuTemplate = '<div class="container"><h1>Меню</h1><ul class="menu"><li><a href="#items">Список чего то</a></li><li><a href="#about">О нас</a></li></ul>'+ backButton +'</div>'
let aboutTemplate = '<div class="container"><h1>About page</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque mollitia aspernatur excepturi, illo et, optio nostrum odio consectetur quibusdam, sapiente velit sunt? Modi, nam cumque distinctio ea laudantium beatae rem?</p>' + backButton + '</div>'
let itemsTemplate = (items, backButt) => {
  itemsList = '<div class="container"><h1>Список чего-то</h1><table>'
  Object.keys(items).map(item => 
    itemsList += '<tr><td>' + items[item].name + '</td><td>'+ items[item].quantity + '</td><td>' + items[item].price + '</td></tr>'
    )
  itemsList += '</table>' + backButt + '</div>'
  return (itemsList)
}

  //экземпляры страниц
let menuPage = new Page(menuTemplate)
let aboutPage = new Page(aboutTemplate)
let itemsPage = new Page(itemsTemplate(ITEMS_LIST.items, backButton))

// создаем роутер
let router = new Router(
  {
    url: '',
    page: menuPage
  },
  {
    url: '#items',
    page: itemsPage
  },
  {
    url: '#about',
    page: aboutPage
  }
)

// проверяем хеш при первой загрузке страницы, текущий хеш не передаем
window.onload = router.checkHash(window.location.hash)

function prevPage() {
  window.history.back()
}

window.onhashchange = function() {
  router.checkHash(window.location.hash)
}