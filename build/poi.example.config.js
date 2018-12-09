module.exports = {
  entry: './example/index.ts',
  devServer: {
    port: 22222
  },
  plugins: [
    {
      resolve: '@poi/plugin-typescript',
      options: {}
    }
  ]
}
