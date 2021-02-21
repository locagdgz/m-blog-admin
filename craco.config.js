const CracoLessPlugin = require("craco-less");
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1e90ff" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
    },
  },
  babel: {
    plugins: [
      [
        "import",
        {
          libraryName: "antd",
          libraryDirectory: "es",
          style: true, //设置为true即是less
        },
      ],
    ],
  },
};
