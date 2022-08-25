import app from '../app.js'
import logger from "../config/logger.js";

const port = process.env.PORT || 8000;

app.listen(port, () =>
    logger.info(`OnePage is running on port ${port}, http://localhost:${port}`)
);
