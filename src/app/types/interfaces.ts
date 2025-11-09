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

//--------------------------------- Geolocation API ---------------------------------

// Top-level response
export interface GeoSearchResponse {
    results: GeoResult[];
    query: {
      text: string;
      parsed: {
        city?: string;
        expected_type: string;
      };
    };
  }

  export interface GeolocationResults {
    city_short_name: string;
    city_long_name: string;
    country: string;
    lat: number;
    lon: number;
  }
  
  // One item in `results`
  export interface GeoResult {
    datasource: Datasource;
    other_names?: Record<string, string>; // keys like "name:he", "alt_name:fr", etc.
    country: string;
    country_code: string;
    state?: string;
    county?: string;
    city?: string;
    town?: string;
    postcode?: string;
    iso3166_2?: string;
    lon: number;
    lat: number;
  
    // enums kept as string unions for safety but still extensible
    result_type: 'city' | 'postcode' | 'village' | 'town' | 'suburb' | 'neighbourhood' | string;
  
    formatted: string;
    address_line1: string;
    address_line2?: string;
  
    category?: 'administrative' | 'populated_place' | string;
  
    timezone?: Timezone;
    plus_code?: string;
    plus_code_short?: string;
    rank?: Rank;
    place_id: string;
    bbox?: BoundingBox;
  
    // Country-specific extras sometimes present
    state_code?: string;
    NUTS_1?: string;
  }
  
  export interface Datasource {
    sourcename: string; // "openstreetmap"
    attribution: string;
    license: string;
    url: string;
  }
  
  export interface Timezone {
    name: string;              // e.g., "Asia/Jerusalem"
    name_alt?: string;         // e.g., "Europe/Brussels"
    offset_STD: string;        // "+02:00"
    offset_STD_seconds: number;
    offset_DST: string;        // "+03:00"
    offset_DST_seconds: number;
    abbreviation_STD: string;  // "IST" / "CET"
    abbreviation_DST: string;  // "IDT" / "CEST"
  }
  
  export interface Rank {
    importance: number;
    confidence: number;
    confidence_city_level?: number;
    match_type?: 'full_match' | 'partial_match' | string;
  }
  
  export interface BoundingBox {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
  }
  