export const API_TAGS = {
  LINKLY: "Linkly",
} as const;

export const API_PATHS = {
  LINKLY: {
    LIST: "/api/linkly/list",
    CREATE: "/api/linkly",
    UPDATE: "/api/linkly",
    DELETE: "/api/linkly",
  },
} as const;

export const API_DEFAULT_VALUES = {
  PAGE: 1,
  LIMIT: 10,
} as const;
