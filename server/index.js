import buildServer from './server.js';

async function main() {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 3001;

  // You must listen on all IPV4 addresses in Cloud Run
  const address = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : undefined;

  try {
    const server = buildServer();

    await server.listen({ port }, (err, address) => {
      if (err) throw err;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

main();
