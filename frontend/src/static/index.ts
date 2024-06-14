const host = window.location.hostname;
const isLocal = host === "localhost" || host === "127.0.0.1";

// TODO: Change name of local storage key after project name has been decided
export const AUTH_TOKEN = `script-auth-token${isLocal ? "-local" : ""}`;
export const USER = `script-user${isLocal ? "-local" : ""}`;
