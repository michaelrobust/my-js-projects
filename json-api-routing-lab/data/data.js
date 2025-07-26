import axios from 'axios';

// URLs for the JSON data
const PEOPLE_URL = 'https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json';
const STOCKS_URL = 'https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json';

const getStocks = async () => {
  try {
    const response = await axios.get(STOCKS_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch stocks data');
  }
};

const getPeople = async () => {
  try {
    const response = await axios.get(PEOPLE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch people data');
  }
};

const getStockById = async (id) => {
  try {
    const stocks = await getStocks();
    const stock = stocks.find(stock => stock.id === id);
    return stock;
  } catch (error) {
    throw new Error('Failed to fetch stock data');
  }
};

const getPersonById = async (id) => {
  try {
    const people = await getPeople();
    const person = people.find(person => person.id === id);
    return person;
  } catch (error) {
    throw new Error('Failed to fetch person data');
  }
};

export { getStocks, getPeople, getStockById, getPersonById };