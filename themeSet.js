// DEFAULT VALUES
// --fontColor: hsl(234, 39 % , 85 % );
// --fontColorHover: hsl(236, 33%, 92%);
// --background-box: #25273c;
// --background-body-color:hsl(235, 21%, 11%);
// --background-image:url(/images/bg-mobile-dark.jpg);



const root = document.documentElement;
const themeBtn = document.querySelector('.todo__header .todo__icon')
let darkMode = true;

const themeSwitch = () => {

    if (darkMode) {
        themeBtn.setAttribute('src', 'images/icon-sun.svg')

        root.style.setProperty('--font-color-hover', 'hsl(236, 33%, 92%)');
        root.style.setProperty('--font-color', 'hsl(234, 39%, 85%)');
        root.style.setProperty('--background-box', ' #25273c');
        root.style.setProperty('--background-body-color', 'hsl(235, 21%, 11%)');
        root.style.setProperty('--background-image-mobile', 'url(../images/bg-mobile-dark.jpg)');
        root.style.setProperty('--background-image-desktop', 'url(../images/bg-desktop-dark.jpg)')


        darkMode = !darkMode;

    } else {
        darkMode = !darkMode;
        themeBtn.setAttribute('src', 'images/icon-moon.svg')
        root.style.setProperty('--font-color-hover', 'hsl(235, 19%, 35%)');
        root.style.setProperty('--font-color', 'hsl(234, 11%, 52%)');
        root.style.setProperty('--background-box', ' #fff');
        root.style.setProperty('--background-body-color', 'hsl(0, 0%, 98%)')
        root.style.setProperty('--background-image-mobile', 'url(../images/bg-mobile-light.jpg)')
        root.style.setProperty('--background-image-desktop', 'url(../images/bg-desktop-light.jpg)')

    }
    console.log('root setted');
    console.log('switch theme ');

}


themeBtn.addEventListener('click', themeSwitch);