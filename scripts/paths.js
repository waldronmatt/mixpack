import path from 'path';

// paths used by scripts to generate markup
var paths = {
  INDEX_FILE: path.join(__dirname, 'index.html'),
  ERROR_FILE: path.join(__dirname, '404.html'),
  PORT: process.env.PORT || 8080,
}

export default paths;
