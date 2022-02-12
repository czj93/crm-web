FROM nginx

WORKDIR /usr/share/nginx/html
COPY deploy/default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html
EXPOSE 80
