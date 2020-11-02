const csvRule = {
   test: /\.csv$/,
   loader: "csv-loader",
   /*options: {
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
   },*/
};

const fs = require("fs");

module.exports = {
   webpack: {
      configure: (webpackConfig) => {
         const modifiedConfig = { ...webpackConfig };
         modifiedConfig.module.rules = [...modifiedConfig.module.rules, csvRule];

         const rules = modifiedConfig.module.rules
            .flatMap((rule) => (rule.oneOf ? rule.oneOf : rule))
            .map(({ test, loader, options, ...other }, i) =>
               test || loader || options ? { i, test, loader, options } : other
            );

         fs.writeFile("webpack.config.json", JSON.stringify(modifiedConfig, null, 2), { encoding: "utf-8" }, () => {});
         fs.writeFile(
            "webpack.rules.csv",
            `index;test;loader\n${rules.map((rule, i) => `${i};${rule.test};${rule.loader}`).join("\n")}`,
            { encoding: "utf-8" },
            () => {}
         );

         return modifiedConfig;
      },
   },
};
