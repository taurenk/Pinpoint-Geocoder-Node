FROM node:10-alpine
MAINTAINER Tauren Kristich tauren.kristich@gmail.com
EXPOSE 1337
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN apk add --update curl && rm -rf /var/cache/apk/*
RUN npm install

# Performance tuning
RUN echo "net.core.somaxconn = 3072" >> /etc/sysctl.conf && \
    echo "net.ipv4.tcp_max_syn_backlog = 4096" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.default.rp_filter = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.tcp_keepalive_time = 120" >> /etc/sysctl.conf && \
    echo "fs.file-max = 2097152" >> /etc/sysctl.conf

HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:1337/v1/health/docker || exit 1
ENTRYPOINT ["node", "index"]