const urlPageTitle = "Alex turnwall";


document.addEventListener('click', (e) => {
    const { target } = e;
    if (target.classList[0] !== "nav-items-text") {
        return;
    }
    e.preventDefault();
    urlRoute(e);
})


// create a function that watches the url and calls the urlLocationHandler
const urlRoute = (event) => {

    event = event || window.event;

    event.preventDefault();

    window.history.pushState(null, null, event.target.href);
    urlLocationHandler();
}


// Routes
const urlRoutes = {
    404: {
        template: "./src/templates/404.html",
        title: "404 | " + urlPageTitle
    },
    "/": {
        template: "./src/templates/home.html",
        title: "Home | " + urlPageTitle
    },
    "/work": {
        template: "./src/templates/work.html",
        title: "Work | " + urlPageTitle
    },
    "/about": {
        template: "./src/templates/about.html",
        title: "about | " + urlPageTitle
    },
    "/blog": {
        template: "./src/templates/blog.html",
        title: "blog | " + urlPageTitle
    },
    "/images": {
        template: "./src/templates/images.html",
        title: "images | " + urlPageTitle
    },
}

// change content according location path
const urlLocationHandler = async () => {
    let location = window.location.pathname;

    if (location.length == 0) {
        location = "/";
    }

    const route = urlRoutes[location] || urlRoutes[404];
    // html content of file
    const html = await fetch(route.template).then((Response) => Response.text());
    // change middle content of main file
    document.getElementById("content").innerHTML = html;
    // change title
    document.title = route.title;

};


// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler();

// call the urlLocationHandler function to handle the initial url
urlLocationHandler();