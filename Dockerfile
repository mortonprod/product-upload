#Get an exact version for compatibility issues.
FROM node:8.1.3

#Set environmental variables.
ENV HOME=/usr/src/app
ENV PORT=3000

#Expose port to let the user of the image know which port to use. 
EXPOSE $PORT

#Build working directory.
RUN mkdir -p $HOME
COPY package.json npm-shrinkwrap.json $HOME/
WORKDIR $HOME
RUN npm install  


USER node
CMD ["node","server.js"]