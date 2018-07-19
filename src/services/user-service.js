//Hide implementation details on how users are fetched. 
//In the future, just by refactoring UserService
//a real api can be queried to get a dataset without compromising the whole application.

import {filterUsers} from './server';

const api = {};

api.getUsers = filter => filterUsers(filter);

export default api;