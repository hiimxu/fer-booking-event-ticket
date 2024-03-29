module.exports = {
    presets: [['next/babel']],
    plugins: [
        [
            'import',
            { libraryName: 'antd', libraryDirectory: 'lib', style: true },
            'antd',
        ],
        [
            'import',
            {
                libraryName: '@ant-design/icons',
                libraryDirectory: 'lib/icons',
                camel2DashComponentName: false,
                style: false,
            },
            '@ant-design/icons',
        ],
    ],
};
