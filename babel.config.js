const plugins = [
  "@babel/plugin-transform-arrow-functions",
  [
    "@babel/plugin-transform-runtime",
    {
      "corejs": false,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }
  ],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-transform-object-assign',
  ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ["@babel/plugin-proposal-class-properties", { "loose": true }],
]

module.exports = function (api) {
  const isTest = api.env('test');
  api && api.cache(false);

  return {
    presets: [
      "@babel/preset-react",
      [
        "@babel/preset-env",
        {
          targets: {
            "browsers": "> 5%",
            "node": "current"
          },
          modules: isTest ? 'commonjs' : false,
          useBuiltIns: "usage",
        },
      ],
    ],
    plugins,
    ignore: [
      "node_modules/**"
    ]
  };
}
