function Weather() {
    const [weatherData, setWeatherData] = React.useState(null);
  
    React.useEffect(() => {
      const apiKey = '02dd36826b460f1c66592a782c0e355b'; // Замініть на свій API-ключ OpenWeatherMap
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=${apiKey}&units=metric`;
  
      const fetchWeather = async () => {
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
  
      fetchWeather();
  
      const interval = setInterval(fetchWeather, 300000);
  
      return () => clearInterval(interval);
    }, []);
  
    if (!weatherData) {
      return <div>Завантаження...</div>;
    }
  
    const { name, weather, main, visibility, wind } = weatherData;
    const { temp, temp_min, temp_max, pressure, humidity } = main;
    const { speed, deg } = wind;
    const windDirection = degToCompass(deg);
  
    return (
      <div>
        <div>Місто: {name}</div>
        <div>Погода: {weather[0].description}</div>
        <div>Температура: {temp}°C</div>
        <div>Мінімальна температура: {temp_min}°C</div>
        <div>Максимальна температура: {temp_max}°C</div>
        <div>Тиск: {pressure} гПа</div>
        <div>Вологість: {humidity}%</div>
        <div>Видимість: {visibility / 1000} км</div>
        <div>Швидкість вітру: {speed} м/с</div>
        <div>Напрям вітру: {windDirection}</div>
      </div>
    );
  }
  
  function degToCompass(num) {
    const val = Math.floor((num / 22.5) + 0.5);
    const arr = [
      'Північ', 'Північно-північно-схід', 'Північний схід', 'Східно-північно-схід', 'Схід',
      'Східно-південно-схід', 'Південний схід', 'Південно-південно-схід', 'Південь', 'Південно-південно-захід',
      'Південний захід', 'Західно-південно-захід', 'Захід', 'Західно-північно-захід', 'Північний захід',
      'Північно-північно-захід'
    ];
    return arr[(val % 16)];
  }
  
  ReactDOM.render(<Weather />, document.getElementById('wind'));
  