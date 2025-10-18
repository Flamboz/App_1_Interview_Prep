export function displayEnvironment() {
  const env = import.meta.env.VITE_ENVIRONMENT;
  const header = document.getElementById('env-header');

  if (header) {
    header.textContent = env === 'prod' ? 'Hello from PROD' : 'Hello from DEV';
  }
}