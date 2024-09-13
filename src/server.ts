import app from "./app";
import connectToMongoDB from "./database/connection";

//config port
import configs from "./config";

async function run() {
  try {
    await connectToMongoDB();
    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
