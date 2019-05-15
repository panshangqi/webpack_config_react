const path = require('path')
var fs = require('fs');


var src_path = path.resolve(__dirname, '..')
var dst_path = path.resolve(__dirname, '../..')
//console.log(dst_path)
//上一级创建空react工程
var file_list = [
    'webpack_config/graphs.js',
    'webpack_config/variables.js',
    'webpack_config/webpack.base.config.js',
    'webpack_config/webpack.dev.config.js',
    'webpack_config/webpack.prod.config.js',
    'package.json',
    'README.md'
]
var dir_list = [
    path.resolve(dst_path, 'webpack_config'),
    path.resolve(dst_path, 'assets'),
    path.resolve(dst_path, 'assets/components'),
    path.resolve(dst_path, 'assets/fonts'),
    path.resolve(dst_path, 'assets/imgs'),
    path.resolve(dst_path, 'assets/pages'),
    path.resolve(dst_path, 'assets/routes'),
    path.resolve(dst_path, 'assets/store'),
    path.resolve(dst_path, 'assets/templates'),

]
for(var dir of dir_list){
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir)
    }
}


for(var file of file_list){
    copy(`${src_path}/${file}`,`${dst_path}/${file}`)
}


function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}