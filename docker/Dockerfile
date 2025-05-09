# BASE 
FROM node:18 AS base

ARG WORKDIR_API

WORKDIR ${WORKDIR_API}

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

COPY app .

# BUILD
FROM base AS build

ARG WORKDIR_API

RUN npm install

RUN chown -R appuser:appgroup ${WORKDIR_API}

USER appuser

# DEV
FROM base AS dev

ARG WORKDIR_API

RUN npm install --save-dev nodemon

COPY --from=build ${WORKDIR_API} .

RUN chown -R appuser:appgroup ${WORKDIR_API}

ARG PORT=3000
ARG PORT_DEBUG=9229

ENV PORT=${PORT}
ENV PORT_DEBUG=${PORT_DEBUG}

USER appuser

EXPOSE ${PORT}

CMD ["npx", "nodemon", "--inspect=0.0.0.0:$PORT_DEBUG", "api.js"]

# PROD
FROM node:alpine AS prod

ARG WORKDIR_API

WORKDIR ${WORKDIR_API}

RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup

ARG PORT=3000
ENV PORT=${PORT}

COPY --from=build ${WORKDIR_API} .

RUN chown -R appuser:appgroup ${WORKDIR_API}

USER appuser

EXPOSE ${PORT}

CMD ["node", "api.js"]