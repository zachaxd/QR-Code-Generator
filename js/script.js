const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')
// create variables, then grab ID's in the html file

btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    nav.classList.toggle('hidden')
});
// add an Event Listener to "btn". Listen for a Click, then run a function
// the function says: toggle a class on "btn" and "nav"
// our classes will then style the nav bar appropriately
// for mobile menu

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url === '') {
        showAlert();

        setTimeout(() => { 
            hideAlert();
        }, 3000);
    } else {
        showSpinner();

        setTimeout(() => { 
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(() => { 
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
};
// new function that does a lot of things.
// first it prevents default
// then a function that clears the ui before serving the next QR code
// then it creates new variables with values submitted from form
// then it checks to see if the url field is empty
// if it is empty, then show run 2 functions that show and then clear an alert
// otherwise, run function showSpinner which just shows our spinner svg and times it out
// then generate our QR code from QR code API
// we want to save the url as well to serve as an img
// and then we save it in the button

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
}
// generates qr code with data url and size

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}
// shows or hides our spinner svg

const showAlert = () => {
    document.getElementById('alert').style.display = 'block';
}

const hideAlert = () => {
    document.getElementById('alert').style.display = 'none';
}
// shows or hides our alert


const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();
};
// clears the ui before showing a new qr code

const createSaveBtn =(saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-lightPurple hover:lightPurple/80 text-white font-bold p-12 rounded w-24 m-auto';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};
// allows us to create the button and have it reference our new url

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
// event listener for submit