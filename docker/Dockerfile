# BASE 
FROM node:18 AS base

ARG WORKDIR_API
RUN useradd -ms /bin/bash appuser
USER appuser
WORKDIR ${WORKDIR_API}

# BUILD
FROM base AS build

COPY --chown=appuser:appuser app .
RUN npm install

# DEV
FROM base AS dev

ARG WORKDIR_API
ARG PORT=3000
ARG PORT_DEBUG=9229
ENV PORT=${PORT}
ENV PORT_DEBUG=${PORT_DEBUG}
COPY --from=build ${WORKDIR_API} .
EXPOSE ${PORT}

CMD ["npx", "nodemon", "--inspect=0.0.0.0:$PORT_DEBUG", "api.js"]

# PROD
FROM node:alpine AS prod

ARG WORKDIR_API
ARG PORT=3000
ENV PORT=${PORT}
WORKDIR ${WORKDIR_API}
RUN adduser -D -s /bin/sh appuser
USER appuser
COPY --from=build ${WORKDIR_API} .
EXPOSE ${PORT}

CMD ["node", "api.js"]