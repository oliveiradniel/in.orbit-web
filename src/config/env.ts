interface Environment {
  API_URL: string;
  GITHUB_CLIENT_ID: string;
}

export const env: Environment = {
  API_URL: import.meta.env.VITE_API_URL!,
  GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID!,
};
