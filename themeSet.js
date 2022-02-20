// DEFAULT VALUES
// --fontColor: hsl(234, 39 % , 85 % );
// --fontColorHover: hsl(236, 33%, 92%);
// --background-box: #25273c;
// --background-body-color:hsl(235, 21%, 11%);
// --background-image:url(/images/bg-mobile-dark.jpg);



const root = document.documentElement;
const themeBtn = document.querySelectorAll('.todo__icon')
let darkMode = true;
const themeSwitch = () => {

    if (darkMode) {
        root.style.setProperty('--font-color-hover', 'hsl(236, 33%, 92%)');
        root.style.setProperty('--background-box', ' #25273c');
        root.style.setProperty('--background-body-color', 'hsl(235, 21%, 11%)')
        root.style.setProperty('--background-image', 'url(/images/bg-mobile-dark.jpg)')
    }
    console.log('root setted');
    console.log('switch theme ');

}


themeBtn.forEach(item => {
    item.addEventListener('click', themeSwitch);


})