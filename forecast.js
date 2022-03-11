
const key = 'PA0gbXZIf3c1aLeeXJg5W4mQMNG6Hphs';
// Get Weather info
const getWeather = async (id) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

    const query = `${id}?apikey=${key}`;
    const response = await fetch(base + query);
    const data = await response.json();
    // console.log(data);
    return data;
};

// Get City info
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(base + query);
    const data = await response.json();
    // console.log(data[3]);
    return data[3];
};

