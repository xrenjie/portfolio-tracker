const BASE_URL = 'http://localhost:8080/v1/';

export const ENDPOINTS = {
  USERS: {
    GET_BY_ID: `${BASE_URL}users/{id}`,
    GET_BY_TOKEN: `${BASE_URL}users/me`,
    CREATE: `${BASE_URL}users`,
    EDIT: `${BASE_URL}users/me`,
  },

  EXPENSES: {
    CREATE: `${BASE_URL}expenses`,
    GET_BY_ID: `${BASE_URL}expenses/{id}`,
    GET_BY_USER: `${BASE_URL}expenses/me`,
    EDIT: `${BASE_URL}expenses`,
    DELETE: `${BASE_URL}expenses/{id}`,
    DELETE_MULTI: `${BASE_URL}expenses`,
  },

  EXPENSE_PARTS: {
    GET_BY_ID: `${BASE_URL}parts/{id}`,
    GET_BY_PAYEE: `${BASE_URL}parts/payee`,
    GET_BY_EXPENSE_ID: `${BASE_URL}parts/expense/{id}`,
    GET_BY_OWNER: `${BASE_URL}parts/me`,
    EDIT: `${BASE_URL}parts`,
  },

  PAYMENTS: {
    GET_BY_ID: `${BASE_URL}payments/{id}`,
    GET_BY_EXPENSE_PART_ID: `${BASE_URL}payments/part/{id}`,
    GET_BY_OWNER: `${BASE_URL}payments/me`,
    CREATE: `${BASE_URL}payments`,
    EDIT: `${BASE_URL}payments`,
    DELETE: `${BASE_URL}payments`,
  },

  FOLDERS: {
    GET_BY_ID: `${BASE_URL}folders/{id}`,
    GET_BY_OWNER: `${BASE_URL}folders/me`,
    MODIFY_USERS: `${BASE_URL}folders/{id}/users`,
    MODIFY_EXPENSES: `${BASE_URL}folders/{id}/expenses`,
    CREATE: `${BASE_URL}folders`,
  },

  GROUPS: {
    GET_BY_ID: `${BASE_URL}groups/{id}`,
    GET_BY_OWNER: `${BASE_URL}groups/me`,
    CREATE: `${BASE_URL}groups`,
    EDIT: `${BASE_URL}groups`,
    MODIFY_USERS: `${BASE_URL}groups/{id}/users`,
  },
};
