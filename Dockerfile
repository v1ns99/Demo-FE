# Fase di build dell'applicazione Angular
FROM node:18 AS build

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione NPM e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia il codice sorgente e costruisce l'app Angular
COPY . .
RUN npm run build 

# Fase finale: configurazione di Nginx
FROM nginx:alpine

# Debug: Visualizza i contenuti iniziali della directory html di Nginx
RUN ls -l /usr/share/nginx/html

# Copia l'applicazione build dalla fase di build alla directory di Nginx
COPY --from=build /app/dist/greeting-service /usr/share/nginx/html

# Copia il file di configurazione personalizzato di Nginx
COPY nginx/default.conf /etc/nginx/conf.d/

# Espone la porta 80 per servire l'applicazione web
EXPOSE 80

# Avvia Nginx
CMD ["nginx", "-g", "daemon off;"]
