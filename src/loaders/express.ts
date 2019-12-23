import bodyParser from 'body-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import Routes from '../routes';
import { handleError, ErrorHandler } from '../helpers/errorHandler';

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

    // 404 error handler
    app.use(() => {
        throw new ErrorHandler(404, 'Not found');
    });

    // Error handlers
    app.use((err, req, res, next) => {
        handleError({ err, res });
    });
};

export default ExpressLoader;
