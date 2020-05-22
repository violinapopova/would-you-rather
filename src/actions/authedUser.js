export const GET_ACTIVE_USER = "GET_ACTIVE_USER";

export function getActiveUser(id) {
  return {
    type: GET_ACTIVE_USER,
    id
  };
}
