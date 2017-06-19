import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opn from 'opn';
import webpackConfig from '../webpack.config.babel';

const host = 'localhost';
const port = process.env.PORT || 3000;
const url = `http://${host}:${port}/`;

const config = webpackConfig({dev: true});
const devServer = new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  overlay: {
    errors: true,
  },
  stats: {
    colors: true,
  },
});

devServer.listen(port, host, async (err) => {
  if (err) {
    console.error(err); // eslint-disable-line no-console

    return;
  }

  console.log(`Listening at ${url}`); // eslint-disable-line no-console
  await opn(url);
});
