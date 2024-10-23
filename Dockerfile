# A base from Node we create,
FROM node

# In /app we set our fate,
WORKDIR /app

# Copy package.json to know,
COPY package.json /app

# Install the things we need to grow,
RUN npm install

# Copy all files, to /app, behold,
COPY . /app

# Open port three thousand, bold,
EXPOSE 3000

# Command to run, to start our quest,
CMD ["node", "index.js"]