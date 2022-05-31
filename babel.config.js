const presets = [
  ['@babel/preset-env', {
    targets: {
      ie: '11',
      chrome: '90',
    },
    useBuiltIns: "entry"
  }]
];

module.exports = { presets };
