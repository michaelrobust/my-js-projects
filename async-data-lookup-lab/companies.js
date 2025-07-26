import axios from 'axios';

// Helper function to get companies data - 使用正確的 URL
const getCompaniesData = async () => {
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json');
  return data;
};

// Helper function to get people data
const getPeopleData = async () => {
  const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json');
  return data;
};

// Function 1: listEmployees
const listEmployees = async (companyName) => {
  // Input validation
  if (!companyName) throw 'Error: You must provide a companyName parameter';
  if (typeof companyName !== 'string') throw 'Error: companyName must be a string';
  if (companyName.trim() === '') throw 'Error: companyName cannot be just empty spaces';
  
  companyName = companyName.trim().toLowerCase();
  
  const companies = await getCompaniesData();
  const people = await getPeopleData();
  
  // Find the company
  const company = companies.find(c => c.name.toLowerCase() === companyName);
  
  if (!company) throw 'Error: No company found with that name';
  
  // Find employees for this company
  const employees = people
    .filter(person => person.company_id === company.id)
    .map(person => `${person.first_name} ${person.last_name}`)
    .sort((a, b) => {
      const lastNameA = a.split(' ')[1];
      const lastNameB = b.split(' ')[1];
      return lastNameA.localeCompare(lastNameB);
    });
  
  // Return company object with employees array
  return {
    ...company,
    employees: employees
  };
};

// Function 2: sameIndustry
const sameIndustry = async (industry) => {
  // Input validation
  if (!industry) throw 'Error: You must provide an industry parameter';
  if (typeof industry !== 'string') throw 'Error: industry must be a string';
  if (industry.trim() === '') throw 'Error: industry cannot be just empty spaces';
  
  industry = industry.trim().toLowerCase();
  
  const companies = await getCompaniesData();
  const sameIndustryCompanies = companies.filter(company => 
    company.industry && company.industry.toLowerCase() === industry
  );
  
  if (sameIndustryCompanies.length === 0) {
    throw 'Error: No companies found in that industry';
  }
  
  return sameIndustryCompanies;
};

// Function 3: getCompanyById
const getCompanyById = async (id) => {
  // Input validation
  if (!id) throw 'Error: You must provide an id parameter';
  if (typeof id !== 'string') throw 'Error: id must be a string';
  if (id.trim() === '') throw 'Error: id cannot be just empty spaces';
  
  id = id.trim();
  
  const companies = await getCompaniesData();
  const company = companies.find(c => c.id === id);
  
  if (!company) throw 'Error: company not found';
  
  return company;
};

export { listEmployees, sameIndustry, getCompanyById };