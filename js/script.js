const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');


const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    nav.classList.toggle('hidden')
});

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

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

const showAlert = () => {
    document.getElementById('alert').style.display = 'block';
}

const hideAlert = () => {
    document.getElementById('alert').style.display = 'none';
}


const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) saveLink.remove();
};

const createSaveBtn =(saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-lightPurple hover:lightPurple/80 text-white font-bold p-12 rounded w-24 m-auto';
    link.href = saveUrl;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);