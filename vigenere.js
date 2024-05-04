// Function to handle if text-box(s) are empty
function encrypt() {
    const plaintext = document.getElementById('plaintext').value.trim();
    const key = document.getElementById('key').value.trim();

    if (plaintext === '' && key === '') {
        showError("Please enter both Plaintext and Key!");
    } else if (plaintext === '') {
        showError("Please enter the Plaintext");
    } else if (key === '') {
        showError("Please enter the Key");
    } else {
        const encryptedText = vigenereEncrypt(plaintext, key);
        document.getElementById('ciphertext').value = encryptedText;
        showSuccess("Encryption successful!");
    }
}

function showError(message) {
    Swal.fire({
        heightAuto: false,
        icon: 'error',
        title: 'Error',
        text: message,
    });
}

function showSuccess(message) {
    Swal.fire({
        heightAuto: false,
        icon: 'success',
        title: 'Success',
        text: message,
    });
}



// Function encrypt plaintext
function vigenereEncrypt(plaintext, key) {
    let ciphertext = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0, j = 0; i < plaintext.length; i++) {
        const char = plaintext.charAt(i);
        const isUppercase = /[A-Z]/.test(char);
        const caseModifier = isUppercase ? 'A' : 'a';
        if (alphabet.indexOf(char) === -1) {
            ciphertext += char;
            continue;
        }
        const keyChar = key.charAt(j % key.length);
        const shift = alphabet.indexOf(keyChar);
        const shiftedCharIndex = (alphabet.indexOf(char) + shift) % alphabet.length;
        const encryptedChar = String.fromCharCode((shiftedCharIndex % 26) + caseModifier.charCodeAt(0));
        ciphertext += encryptedChar;
        j++;
    }

    return ciphertext;
}

// Function to handle file input change event
document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;
        document.getElementById('plaintext').value = contents;
    };

    reader.readAsText(file);
});


// Function to reset the text-boxes
function resetForm() {
    document.getElementById('plaintext').value = '';
    document.getElementById('fileInput').value = '';
    document.getElementById('key').value = '';
    document.getElementById('ciphertext').value = '';
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Reset successful"
    });
}