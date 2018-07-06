var shell = require('shelljs');

shell.cp("-R", "static-pages/fonts", "static-pages/dist/");
shell.cp("-R", "static-pages/js", "static-pages/dist/");
shell.cp("-R", "static-pages/images", "static-pages/dist/");
