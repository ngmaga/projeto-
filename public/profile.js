// Definindo a classe MenuNavegacao
class MenuNavegacao {
    constructor(toggleId, navId, bodyId, headerId) {
        this.toggle = document.getElementById(toggleId);
        this.nav = document.getElementById(navId);
        this.bodypd = document.getElementById(bodyId);
        this.headerpd = document.getElementById(headerId);

        if (this.toggle && this.nav && this.bodypd && this.headerpd) {
            this.toggle.addEventListener('click', this.toggleNavbar.bind(this));
        }

        this.linkColor = document.querySelectorAll('.nav_link');
        this.linkColor.forEach(link => link.addEventListener('click', this.colorLink.bind(this)));
    }

    toggleNavbar() {
        this.nav.classList.toggle('show');
        this.toggle.classList.toggle('bx-x');
        this.bodypd.classList.toggle('body-pd');
        this.headerpd.classList.toggle('body-pd');
    }

    colorLink(event) {
        this.linkColor.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    }
}

// Aguardando o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Instanciando a classe MenuNavegacao
    const menu = new MenuNavegacao('header-toggle', 'nav-bar', 'body-pd', 'header');
});
