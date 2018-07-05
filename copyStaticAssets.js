var shell = require('shelljs');

shell.cp("-R", "static-pages/fonts", "static-pages/dist/fonts/");
shell.cp("-R", "static-pages/js", "static-pages/dist/js/");
