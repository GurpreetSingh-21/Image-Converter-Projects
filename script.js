// Handle file selection and drag-and-drop
const uploadBox = document.getElementById('upload-box');
const fileInput = document.getElementById('file-input');
const chooseFileBtn = document.getElementById('choose-file-btn');
const outputImage = document.getElementById('output-image');
const convertedImageLink = document.getElementById('download-link');
const imageOutput = document.getElementById('image-output');

// Function to handle file selection
function handleFile(file) {
    if (file.type === 'image/heic') {
        console.log('HEIC file detected:', file);
        const targetType = document.getElementById('format-select').value === 'jpg' ? 'image/jpg' : 'image/png';
        console.log('Converting to type:', targetType);
        heic2any({ 
            blob: file, 
            toType: targetType
        })
        .then(function(convertedBlob) {
            console.log('HEIC conversion successful');
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('uploaded-image-preview').src = event.target.result;
                document.getElementById('uploaded-image-preview').style.display = 'block';
                document.getElementById('convert-btn').disabled = false;
            };
            reader.readAsDataURL(convertedBlob);
        })
        .catch(function(error) {
            console.error('Error converting HEIC:', error);
            alert('HEIC conversion failed. Please try another file.');
        });
    } else {
        // Handle non-HEIC files
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('uploaded-image-preview').src = event.target.result;
            document.getElementById('uploaded-image-preview').style.display = 'block';
            document.getElementById('convert-btn').disabled = false;
        };
        reader.readAsDataURL(file);
    }
}


// Handle file input change
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
});

// Handle "Choose file" button click
chooseFileBtn.addEventListener('click', function() {
    fileInput.click();
});

// Handle drag and drop
uploadBox.addEventListener('dragover', function(event) {
    event.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', function(event) {
    event.preventDefault();
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', function(event) {
    event.preventDefault();
    uploadBox.classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    if (file) {
        handleFile(file);
    }
});

// Handle conversion and download
document.getElementById('convert-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input').files[0];
    const selectedFormat = document.getElementById('format-select').value;

    if (fileInput) {
        if (fileInput.type === 'image/heic') {
            heic2any({ 
                blob: fileInput, 
                toType: selectedFormat === 'jpg' ? 'image/jpg' : 'image/png'
            })
            .then(function(convertedBlob) {
                const url = URL.createObjectURL(convertedBlob);
                outputImage.src = url;
                imageOutput.style.display = 'block';

                convertedImageLink.href = url;
                convertedImageLink.download = `converted-image.${selectedFormat}`;
                convertedImageLink.style.display = 'inline-block';
            })
            .catch(function(error) {
                alert('HEIC conversion failed. Please try again.');
                console.error('Error:', error);
            });
        } else {
            // Handle non-HEIC images (PNG, JPG)
            const url = URL.createObjectURL(fileInput);
            outputImage.src = url;
            imageOutput.style.display = 'block';

            convertedImageLink.href = url;
            convertedImageLink.download = `converted-image.${selectedFormat}`;
            convertedImageLink.style.display = 'inline-block';
        }
    } else {
        alert('Please upload an image first.');
    }
});

