
ARG CLIENT_DIR='/home/emmotion/next_client'
ARG PROJECT_DIR='/home/emmotion/project'
ARG PROJECT_REPO='git@bitbucket.org:vityokklymets/edm-motion.git'
ARG PROJECT_BRANCH='master'

FROM node:14.17.6

ARG PROJECT_DIR
ARG CLIENT_DIR
ARG PROJECT_REPO
ARG PROJECT_BRANCH
ARG SSH_KEY
ARG SSH_KEY_PUB

RUN mkdir -p /root/.ssh \
    && echo "$SSH_KEY" > /root/.ssh/id_rsa \
    && echo "$SSH_KEY_PUB" > /root/.ssh/id_rsa.pub \
    && chmod 600 /root/.ssh/id_rsa /root/.ssh/id_rsa.pub \
    && touch /root/.ssh/known_hosts \
    && ssh-keyscan bitbucket.org >> /root/.ssh/known_hosts

RUN git clone --single-branch --branch $PROJECT_BRANCH $PROJECT_REPO $PROJECT_DIR \
    && cd ${PROJECT_DIR} && cd client


RUN mkdir -p $CLIENT_DIR


COPY ./ ${CLIENT_DIR}

WORKDIR ${CLIENT_DIR}

RUN npx browserslist@latest --update-db

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD [ "npm", "run" , "start"]