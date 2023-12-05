import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    // console.log('URL from server', config.database_url);
    app.listen(config.port, () => {
      console.log(`app is listening on PORT  ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
server();
