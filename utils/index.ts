import { CarProps } from "@/types";

// fetchCars realiza uma solicitação assíncrona para obter informações sobre carros. Ela utiliza a 
//API "cars-by-api-ninjas.p.rapidapi.com" e passa um cabeçalho contendo uma chave de autenticação para 
//autenticar a solicitação.
export async function fetchCars() {
    const headers = {
		'X-RapidAPI-Key': 'fc248a0f7emsh593a7f4cdb72c14p12e769jsn406e8bcf6573',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=carrera', {
        headers: headers,
    });
    const result = await response.json();

    return result;
}

/*
calculateCarRent calcula o preço de aluguel de um carro com base na eficiência de combustível da cidade 
(city_mpg) e no ano do carro. Ela utiliza fatores de cálculo para levar em consideração a quilometragem
 e a idade do veículo.
*/

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

/*
generateCarImageUrl gera a URL de uma imagem de carro com base nas informações do carro fornecidas
 como parâmetro (car). Ela constrói uma URL utilizando a API "cdn.imagin.studio/getimage" e adiciona 
 parâmetros como a marca (make), modelo (model), ano (year) e ângulo (angle) do carro. A URL gerada 
 é retornada como resultado.
*/

  export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', "hrjavascript-mastery");
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  }