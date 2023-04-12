# build from the Ubuntu 18.04 image
FROM ubuntu:20.04
 
# create the mssql user
RUN useradd -u 10001 mssql
 
#instaling node
RUN apt-get update 
RUN apt install curl
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN chmod +x tmp/nodesource_setup.sh
RUN ./tmp/nodesource_setup.sh
RUN apt-get install -y nodejs

# installing SQL Server
RUN apt-get update && apt-get install -y wget software-properties-common apt-transport-https
RUN wget -qO- https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN add-apt-repository "$(wget -qO- https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list)"
RUN apt-get update && apt-get install -y mssql-server
 
# creating directories
RUN mkdir /var/opt/sqlserver
RUN mkdir /var/opt/sqlserver/data
RUN mkdir /var/opt/sqlserver/log
RUN mkdir /var/opt/sqlserver/backup
 
# set permissions on directories
RUN chown -R mssql:mssql /var/opt/sqlserver
RUN chown -R mssql:mssql /var/opt/mssql
 
# switching to the mssql user
USER mssql

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# starting SQL Server
CMD /opt/mssql/bin/sqlservr 