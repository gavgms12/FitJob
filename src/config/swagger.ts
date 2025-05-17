import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerDocument = YAML.load(path.join(__dirname, '../../../docs/swagger.yaml'));

export const swaggerConfig = {
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerDocument)
}; 