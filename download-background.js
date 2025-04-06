const https = require('https');
const fs = require('fs');
const path = require('path');

// Professional food background image URL (replace with your preferred image)
const imageUrl = 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2940&auto=format&fit=crop';

// Download path
const downloadPath = path.join(__dirname, 'public', 'background.jpg');

// Create public directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'));
}

// Download the image
https.get(imageUrl, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(downloadPath);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log('Background image downloaded successfully!');
    });
  } else {
    console.error('Failed to download image:', response.statusCode);
  }
}).on('error', (err) => {
  console.error('Error downloading image:', err.message);
});