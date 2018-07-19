import faker from 'faker';

const createUser = () => {
  return {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName()
  };
};

const USER_COUNT = 100000;

const users = Array(USER_COUNT)
  .fill('')
  .map(x => createUser());

  //Query interpreter capable running queries against any type of dataset.
  const queries = {
    //greaterThan: (value, field, dataset) => {}
    //lessThan: (value, field, dataset) => {}
    //etc etc
    substring: ({value, fields}, dataset) => {
    const lowered = s => s.toLowerCase();
    return dataset.filter(i => {
      for(let field of fields)
        for(let split of value.trim().split(' '))
          if(lowered(i[field]).indexOf(lowered(split)) != -1)
            return true;
      return false;
    })
  }
}

const filter = ({where, skip, limit}, dataset) => 
  Object.keys(where)
  .map(query => queries[query](where[query], dataset))
  .reduce((p,c) => [...p, ...c], [])
  .slice(skip, limit);

//We might as well mock asyncrhonous behaviour by returning a promise if we are mocking a users api 
//{where: {substring: {value: 'Puranjay Rajpal', fields: []}}, limit: 1000, skip: 200}
export const filterUsers = ({where = null, skip = 0, limit = 1000}) =>
  new Promise((resolve, reject) => {
  if(limit && isNaN(limit))
    return reject({message: 'Invalid limit parameter', status: 403});
  
  if(limit > 1000)
    return reject({message: 'Invalid limit parameter, payload is too large', status: 403});

  resolve({data: filter({where, skip, limit}, users), status: 200});
});





