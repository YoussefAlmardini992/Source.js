function Source() {
    this.blocks = [];
    this.container = document.createElement('DIV');
    this.IsEmpty = true;

    this.createBlock = function (element, name) {
        const block = document.createElement(element);
        block.id = name;
        this.blocks.push({name: name, element: block});
        if (this.IsEmpty) {
            this.container.appendChild(this.blocks[0].element);
            this.IsEmpty = false;
        } else {
            this.blocks[this.blocks.length - 2].element.appendChild(this.blocks[this.blocks.length - 1].element);
        }
    };
    this.createList = function (element, name, data) {
        const limit = this.blocks.length - 1;
        for (let i = 0; i < data.length; i++) {
            const block = document.createElement(element);
            this.blocks.push({name: name, element: block, title: data[i]});
            this.blocks[limit].element.appendChild(this.blocks[limit + i + 1].element);
            this.blocks[limit + i + 1].element.innerText = data[i];
        }
    };
    this.appendTo = function (source) {
        source.appendChild(this.container);
    };
    this.getBlock = function (target) {
        if (this.IsEmpty) {
            console.error('Source is empty . please try first ( createBlock ) in your Source object. ');
            return;
        }
        for (const element in this.blocks) {
            if (this.blocks[element].name === target) {
                return this.blocks[element].element;
            }
        }
        console.error('no such block  with the name (' + target + ') is found .  please try first ( createBlock ) in your Source object with this name');
    };
    this.appendImage = function (target, src, alt) {
        const image = document.createElement('IMG');
        image.src = src;
        image.alt = alt;
        this.getBlock(target).appendChild(image);
    };
    this.styling = function (block, Class) {
        block.classList.add(Class);
    };
    this.pickStyleSheet = function (styleSheet) {
        const cssId = 'styles.css';
        if (!document.getElementById(cssId)) {
            const head = document.getElementsByTagName('head')[0];
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = styleSheet;
            link.media = 'all';
            head.appendChild(link);
        }
    };
};

function Core() {

}


    window.onload = function () {

        const events = new Core();

        const Nav = new Source();
        const responsiveNav = new Source();


        window.addEventListener("resize", events.ShowNavAfterResponsive);

        Nav.pickStyleSheet('./styles.css');
        Nav.styling(Nav.container, 'container');
        Nav.createBlock('NAV', 'nav');
        Nav.createBlock('UL', 'ul');
        Nav.createList('LI', 'li', ['home', 'about', 'feedback', 'contact']);
        Nav.styling(Nav.getBlock('nav'), 'nav');

        responsiveNav.pickStyleSheet('./styles.css');
        responsiveNav.styling(responsiveNav.container, 'responsiveNavContainer');
        responsiveNav.createBlock('a', 'a');
        responsiveNav.styling(responsiveNav.getBlock('a'), 'responsiveMenu');
        responsiveNav.appendImage('a', './media/icon.png', 'icon');
        responsiveNav.appendTo(Nav.getBlock('ul'));


        Nav.appendTo(document.body);
    };




