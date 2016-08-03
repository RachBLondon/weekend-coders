module.exports = {
    entry : './client/app/src/index.js',
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
            presets: ['es2015', 'react', 'stage-1'] }
            }
        ]
    }
}