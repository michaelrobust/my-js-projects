import { getPersonById, sameJobTitle, getPostalCodes, sameCityAndState } from './people.js';
import { listEmployees, sameIndustry, getCompanyById } from './companies.js';

async function main() {
  console.log('===== Testing people.js functions =====\n');

  // Test getPersonById
  console.log('1. Testing getPersonById:');
  try {
    console.log('Valid ID test:');
    const person = await getPersonById("fa36544d-bf92-4ed6-aa84-7085c6cb0440");
    console.log(person);
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid ID test:');
    await getPersonById("invalid-id");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nEmpty parameter test:');
    await getPersonById();
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  // Test sameJobTitle
  console.log('\n2. Testing sameJobTitle:');
  try {
    console.log('Valid job title test:');
    const sameJob = await sameJobTitle("Help Desk Operator");
    console.log(`Found ${sameJob.length} people with the same job title`);
    sameJob.forEach(person => console.log(`${person.first_name} ${person.last_name}`));
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid job title test:');
    await sameJobTitle("Non-existent Job");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  // Test getPostalCodes
  console.log('\n3. Testing getPostalCodes:');
  try {
    console.log('Valid city and state test:');
    const postalCodes = await getPostalCodes("Salt Lake City", "Utah");
    console.log(postalCodes);
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid city and state test:');
    await getPostalCodes("Nonexistent City", "Nonexistent State");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  // Test sameCityAndState
  console.log('\n4. Testing sameCityAndState:');
  try {
    console.log('Valid city and state test:');
    const sameCityState = await sameCityAndState("Salt Lake City", "Utah");
    console.log(sameCityState);
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid city and state test:');
    await sameCityAndState("Nonexistent City", "Nonexistent State");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  console.log('\n===== Testing companies.js functions =====\n');

  // Test listEmployees
  console.log('5. Testing listEmployees:');
  try {
    console.log('Valid company test:');
    const companyWithEmployees = await listEmployees("Yost, Harris and Cormier");
    console.log(companyWithEmployees);
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid company test:');
    await listEmployees("Non-existent Company");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  // Test sameIndustry
  console.log('\n6. Testing sameIndustry:');
  try {
    console.log('Valid industry test:');
    const industryCompanies = await sameIndustry("Auto Parts:O.E.M.");
    console.log(`Found ${industryCompanies.length} companies in the same industry`);
    industryCompanies.forEach(company => console.log(company.name));
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid industry test:');
    await sameIndustry("Non-existent Industry");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  // Test getCompanyById
  console.log('\n7. Testing getCompanyById:');
  try {
    console.log('Valid company ID test:');
    const company = await getCompanyById("fb90892a-f7b9-4687-b497-d3b4606faddf");
    console.log(company);
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  try {
    console.log('\nInvalid company ID test:');
    await getCompanyById("invalid-company-id");
  } catch (e) {
    console.log(`Error: ${e}`);
  }

  console.log('\n===== All tests completed =====');
}

main();