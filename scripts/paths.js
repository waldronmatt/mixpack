import path from 'path';

// paths used by scripts to generate markup
var paths = {
  HTML_FILE: path.join(__dirname, 'index.html'),
  PORT: process.env.PORT || 8080,
}

export default paths;
