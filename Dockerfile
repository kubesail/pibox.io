# syntax=docker/dockerfile:1.3
# Install dependencies only when needed
FROM node:16-bullseye-slim AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-bullseye-slim AS runner
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED="1" \
  NODE_ENV="production"
#  \
# SSL_KEY_FILE="/app/secrets/tls.key" \
# SSL_CRT_FILE="/app/secrets/tls.crt"
RUN apt-get update -yqq && \
  apt-get install -yqq awscli && \
  chown -R node:node /app
# mkdir -p /app/secrets && \
USER node
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node public ./public
COPY --chown=node:node config ./config
COPY --chown=node:node styles ./styles
COPY --chown=node:node components ./components
COPY --chown=node:node pages ./pages
COPY --chown=node:node *.js *.json *.md ./
# COPY --chown=node:node package.json tls.cr[t] tls.ke[y] /app/secrets/

EXPOSE 3000
# VOLUME ["/app/secrets"]
CMD ["bash", "-c", "yarn build && yarn start"]

FROM runner AS dev
CMD ["bash", "-c", "yarn dev"]

# FROM runner AS deployer
# WORKDIR /app
# ENV NEXT_TELEMETRY_DISABLED="1" \
#   NODE_ENV="production"
# ARG AWS_BUCKET=pibox.io
# ARG AWS_ACCESS_KEY_ID
# ARG AWS_SECRET_ACCESS_KEY
# RUN yarn build 

# && aws s3 sync \
#   --size-only \
#   --exclude "*" \
#   --include="*/*.png" \
#   --include="*/*.json" \
#   --include "*/*.svg" \
#   --include "*/*.jpg" \
#   --include "*/*.obj" \
#   --include "*/*.mtl" \
#   --cache-control public,max-age=31536000,stale-while-revalidate=3600,stale-if-error=3600,immutable \
#   .next/static/ s3://${AWS_BUCKET}/_next/static/ \
#   --no-progress \
#   --acl public-read
