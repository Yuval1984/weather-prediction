export interface main {
    temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
}
export interface ThreeHoursForcast {
    dt: number;
    main: main;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
        pod: string;
    };
    dt_txt: string;
}
export interface City {
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}
export interface ThreeDayWeatherForecast {
    city: City;
    cod: string;
    message: number;
    cnt: number;
    list: ThreeHoursForcast[];
}

export enum Temperature {
    WARM,
    HOT,
    VERY_HOT,
    COLD
}

export enum TimeOfDay {
    DAY,
    NIGHT
}

export enum WeatherDescription {
    CLEAR_SKY = 'clear sky',
    BROKEN_CLOUDS = 'broken clouds',
    FEW_CLOUDS = 'few clouds',
    SCATTERED_CLOUDS = 'scattered clouds',
    RAIN = 'rain',
}