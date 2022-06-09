import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import pino from 'pino';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`,
});

function buildServer() {
  const server = Fastify({
    logger,
    trustProxy: true,
  });

  server.get('/', async () => {
    return {
      root: true,
    };
  });

  server.get('/healthcheck', async () => {
    return {
      status: 'OK',
    };
  });

  server.register(fastifyCors);

  server.route({
    method: 'GET',
    url: '/users',
    handler: async () => {
      return [
        {
          id: 1,
          name: 'Ryan Dahl',
        },
        {
          id: 2,
          name: 'TJ Holowaychuck',
        },
        {
          id: 3,
          name: 'Dan Abramov',
        },
        {
          id: 4,
          name: 'Guillermo Rauch',
        },
      ];
    },
  });

  server.setErrorHandler((error, request, reply) => {
    server.log.error(error);

    if (handledError) {
      const { status, message } = handledError;
      reply.code(status).send({ message });
    } else {
      reply.code(500).send({ message: 'Something went wrong' });
    }
  });

  return server;
}

export default buildServer;
