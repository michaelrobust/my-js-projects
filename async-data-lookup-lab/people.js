import axios from 'axios';

// Helper function to get people data - 使用正確的 URL
const getPeopleData = async () => {
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
  return data;
};

// Function 1: getPersonById
const getPersonById = async (id) => {
  // Input validation
  if (!id) throw 'Error: You must provide an id parameter';
  if (typeof id !== 'string') throw 'Error: id must be a string';
  if (id.trim() === '') throw 'Error: id cannot be just empty spaces';
  
  id = id.trim();
  
  const people = await getPeopleData();
  const person = people.find(p => p.id === id);
  
  if (!person) throw 'Error: person not found';
  
  return person;
};

// Function 2: sameJobTitle
const sameJobTitle = async (jobTitle) => {
  // Input validation
  if (!jobTitle) throw 'Error: You must provide a jobTitle parameter';
  if (typeof jobTitle !== 'string') throw 'Error: jobTitle must be a string';
  if (jobTitle.trim() === '') throw 'Error: jobTitle cannot be just empty spaces';
  
  jobTitle = jobTitle.trim().toLowerCase();
  
  const people = await getPeopleData();
  const sameJobPeople = people.filter(person => 
    person.job_title && person.job_title.toLowerCase() === jobTitle
  );
  
  if (sameJobPeople.length < 2) {
    throw 'Error: There are not at least two people with the same job title';
  }
  
  return sameJobPeople;
};

// Function 3: getPostalCodes
const getPostalCodes = async (city, state) => {
  // Input validation
  if (!city) throw 'Error: You must provide a city parameter';
  if (!state) throw 'Error: You must provide a state parameter';
  if (typeof city !== 'string') throw 'Error: city must be a string';
  if (typeof state !== 'string') throw 'Error: state must be a string';
  if (city.trim() === '') throw 'Error: city cannot be just empty spaces';
  if (state.trim() === '') throw 'Error: state cannot be just empty spaces';
  
  city = city.trim().toLowerCase();
  state = state.trim().toLowerCase();
  
  const people = await getPeopleData();
  const postalCodes = people
    .filter(person => 
      person.city && person.state &&
      person.city.toLowerCase() === city && 
      person.state.toLowerCase() === state
    )
    .map(person => person.postal_code)
    .filter(code => code) // 過濾掉空值
    .sort();
  
  if (postalCodes.length === 0) {
    throw 'Error: There are no postal_codes for the given city and state combination';
  }
  
  return postalCodes;
};

// Function 4: sameCityAndState
const sameCityAndState = async (city, state) => {
  // Input validation
  if (!city) throw 'Error: You must provide a city parameter';
  if (!state) throw 'Error: You must provide a state parameter';
  if (typeof city !== 'string') throw 'Error: city must be a string';
  if (typeof state !== 'string') throw 'Error: state must be a string';
  if (city.trim() === '') throw 'Error: city cannot be just empty spaces';
  if (state.trim() === '') throw 'Error: state cannot be just empty spaces';
  
  city = city.trim().toLowerCase();
  state = state.trim().toLowerCase();
  
  const people = await getPeopleData();
  const sameCityStatePeople = people
    .filter(person => 
      person.city && person.state &&
      person.city.toLowerCase() === city && 
      person.state.toLowerCase() === state
    )
    .map(person => `${person.first_name} ${person.last_name}`)
    .sort((a, b) => {
      const lastNameA = a.split(' ')[1];
      const lastNameB = b.split(' ')[1];
      return lastNameA.localeCompare(lastNameB);
    });
  
  if (sameCityStatePeople.length < 2) {
    throw 'Error: There are not at least two people who live in the same city and state';
  }
  
  return sameCityStatePeople;
};

export { getPersonById, sameJobTitle, getPostalCodes, sameCityAndState };