import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [{
    input: './src/index.js',
    output: {
        file: 'dist/bundle.js',
        name: 'h5OpenAppControl',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}, {
    input: './src/index.js',
    output: [
        {file: pkg.main, format: 'cjs'}
    ]
}];
