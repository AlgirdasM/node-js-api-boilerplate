import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import Routes from '../routes';

const ExpressLoader = ({ app }) => {
  // Health Check
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // If you're behind a reverse proxy it will show the real origin IP in the logs
  app.enable('trust proxy');

  // Enable cors
  // TODO: make whitelist
  app.use(cors());

  // Use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
  app.use(methodOverride());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load routes
  Routes({ app });

  // Error handlers
  // 404 error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
    next();
  });
};

export default ExpressLoader;
