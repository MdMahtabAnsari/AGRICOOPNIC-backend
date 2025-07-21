import serverConfig from "./server.config";

const corsConfig = {
  origin: serverConfig.CORS_ORIGIN,
  credentials: serverConfig.CORS_CREDENTIALS,
  allowedHeaders: serverConfig.CORS_HEADERS,
  methods: serverConfig.CORS_METHODS,
};

export default corsConfig;
