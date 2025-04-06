const https = require('https');
const fs = require('fs');
const path = require('path');

const recipeImages = [
  {
    name: 'rainbow-pasta.jpg',
    url: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=1470&auto=format&fit=crop'
  },
  {
    name: 'protein-bowl.jpg',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop'
  },
  {
    name: 'med-salad.jpg',
    url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1474&auto=format&fit=crop'
  },
  {
    name: 'digestion-soup.jpg',
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1471&auto=format&fit=crop'
  }
];

// Ensure the recipes directory exists
const recipesDir = path.join(__dirname, 'public', 'recipes');
if (!fs.existsSync(recipesDir)) {
  fs.mkdirSync(recipesDir, { recursive: true });
}

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(recipesDir, filename);
    const fileStream = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
        return;
      }

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename} successfully!`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => reject(err));
      });
    }).on('error', reject);
  });
};

async function downloadAllImages() {
  try {
    for (const img of recipeImages) {
      await downloadImage(img.url, img.name);
    }
    console.log('All recipe images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 