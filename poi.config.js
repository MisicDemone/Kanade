module.exports = {
  entry: './src/index.ts',
  devServer: {
    port: 23333
  },
  plugins: [
    {
      resolve: '@poi/plugin-ts-check',
      options: {}
    }
  ]
}
