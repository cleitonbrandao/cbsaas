import { fastifyCors } from '@fastify/cors';
import { fastify } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { createAccount } from './routes/auth/create-account';
import { authenticateWithPassword } from './routes/auth/authenticate-with-password';
import { getProfile } from './routes/auth/get-profile';
import { errorHandler } from './error-handler';
import { requestPasswordRecover } from './routes/auth/request-password-recover';
import { resetPassword } from './routes/auth/reset-password';
import { env } from '@cbsaas/env';
import { createOrganization } from './routes/organization/create-organization';
import { getMemebership } from './routes/organization/get-membership';
import { getOrganization } from './routes/organization/get-organization';
import { getOrganizations } from './routes/organization/get-organizations';
import { updateOrganization } from './routes/organization/update-organization';
import { shutdownOrganization } from './routes/organization/shutdown-organization';
import { transferOrganization } from './routes/organization/transfer-organization';
import { createProject } from './routes/projects/create-project';
import { deleteProject } from './routes/projects/delete-project';
import { getProject } from './routes/projects/get-project';
import { getProjects } from './routes/projects/get-projects';
import { updateProject } from './routes/projects/update-project';
import { getMembers } from './routes/members/get-members';
import { updateMember } from './routes/members/update-member';
import { removeMember } from './routes/members/remove-member';
import { createInvite } from './routes/invites/create-invite';
import { getInvite } from './routes/invites/get-invite';
import { getInvites } from './routes/invites/get-invites';
import { acceptInvite } from './routes/invites/accept-invite';
import { rejectInvite } from './routes/invites/reject-invite';
import { revokeInvite } from './routes/invites/revoke-invite';
import { getPendingInvites } from './routes/invites/get-pending-invites';
import { getOrganizationBilling } from './routes/billing/get-organization-billing';
import { createProduct } from './routes/products/create-product';
import { getProducts } from './routes/products/get-products';
import { deleteProduct } from './routes/products/delete-product';
import { updateProduct } from './routes/products/update-product';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Cbs SaaS',
      description: 'Full-stack saas app multi-tennant & RBAC',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
  // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
  //
  // transform: createJsonSchemaTransform({
  //   skipList: [ '/documentation/static/*' ]
  // })
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.register(fastifyCors);

app.register(createAccount);
app.register(authenticateWithPassword);
app.register(getProfile);
app.register(requestPasswordRecover);
app.register(resetPassword);

app.register(createOrganization);
app.register(getMemebership);
app.register(getOrganization);
app.register(getOrganizations);
app.register(updateOrganization);
app.register(shutdownOrganization);
app.register(transferOrganization);

app.register(createProject);
app.register(deleteProject);
app.register(getProject);
app.register(getProjects);
app.register(updateProject);

app.register(getMembers);
app.register(updateMember);
app.register(removeMember);

app.register(createInvite);
app.register(getInvite);
app.register(getInvites);
app.register(acceptInvite);
app.register(rejectInvite);
app.register(revokeInvite);
app.register(getPendingInvites);

app.register(getOrganizationBilling);

app.register(createProduct);
app.register(getProducts);
app.register(deleteProduct);
app.register(updateProduct);

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running!');
});
