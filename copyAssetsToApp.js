var shell = require('shelljs');

shell.cp("-R", "static-pages/dist/fonts", "src/assets/");
shell.cp("-R", "static-pages/dist/js", "src/assets/");
shell.cp("-R", "static-pages/dist/images", "src/assets/");
shell.cp("-R", "static-pages//dist/css", "src/assets/");
