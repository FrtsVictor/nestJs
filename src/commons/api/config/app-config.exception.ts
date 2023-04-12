export class AppConfigurationException extends Error {
  constructor(message = 'Error trying to configure application') {
    super(message);
  }
}
