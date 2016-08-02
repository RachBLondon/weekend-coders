module.exports = {
    entry : './client/main.js',
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module:{
        loaders:[
            {
            test: /\.js?/,
            include: /client/,
            loader: 'babel',
            query:{
            presets: ['es2015', 'react'] }
            }
        ]
    }
}