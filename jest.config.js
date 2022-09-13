module.exports ={
    preset:'@vue/cli-plugin-unit-jest',
    collectCoverage:true,
    collectCoverageFrom:[
        'src/**/*.{js,vue}',
        '!scr/main.js',
    ]
}
