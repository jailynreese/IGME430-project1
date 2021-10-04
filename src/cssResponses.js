const fs = require('fs');

const styleSheet = fs.readFileSync(`${__dirname}/../client/style.css`);

const getStyle = (require, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(styleSheet);
  response.end();
};

module.exports.getStyle = getStyle;
