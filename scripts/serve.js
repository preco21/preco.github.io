import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import webpackConfig from '../webpack.config.babel';

const host = 'localhost';
const port = 8080;
const url = `http://${host}:${port}/`;

const config = webpackConfig({dev: true});

config.entry.unshift(
  `webpack-dev-server/client?${url}`,
  'webpack/hot/only-dev-server',
);

const devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  stats: {
    color: true,
  },
});

devServer.listen(port, host, (err) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console

    return;
  }

  console.log(`Listening at ${url}`); // eslint-disable-line no-console
  opn(url);
});
