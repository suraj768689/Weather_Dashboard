# Weather Dashboard
A weather dashboard built with React, which fetches real-time weather data and a 5-day forecast using the OpenWeatherMap API. Users can search for a city, view the current weather, and see the forecast for the next 5 days. The app also includes functionality to save and manage favorite cities.

# Features
* Search for a city and view current weather and 5-day forecast.
* Add cities to a list of favorites.
* Remove cities from the list of favorites.
* Display weather data for favorite cities.
* Stores last searched city using local storage.

# Components
* Search: Allows users to search for cities.
* Weather Display: Displays current weather data and 5-day forecast.
* Favorite: Manages favorite cities and displays weather for those cities.

# Prerequisites
Before running the application, you need:
* A React development environment (Node.js, npm/yarn installed).
* API Key from OpenWeatherMap.

# Steps to Set Up
1. Clone the repository
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

2. Install dependencies
Run the following command to install all the necessary dependencies:
npm install

3. Obtain an OpenWeatherMap API Key
To use the OpenWeatherMap API, you need to get an API key:
* Go to OpenWeatherMap and create an account.
* After logging in, navigate to API keys and create a new key.
* Copy the API key to use in your application.

4. Set up your API Key
* Create a .env file in the root of your project.
* Add the following line to the .env file:
REACT_APP_OPENWEATHER_API_KEY=your-api-key-here

Replace your-api-key-here with the API key you obtained from OpenWeatherMap.

5. Start the Application
After setting up the environment, start the development server:
npm start

This will launch the app in your default browser, usually at http://localhost:3000.

6. Running JSON Server (Optional)
If you want to run a JSON server to manage favorite cities:
* Install JSON server globally:
  npm install -g json-server
  
* Create a db.json file in the root directory with the following structure:
{
  "favorites": []
}
* Start the JSON server:
json-server --watch db.json --port 5000

* The server will run on http://localhost:5000 by default.
