import { Client, Configuration } from 'bugsnag-react-native';

const config = new Configuration();

config.automaticallyCollectBreadcrumbs = true;
config.apiKey = 'aff0984eb5e47164b2bf18916afdbf67';
config.autoCaptureSessions = true;
config.consoleBreadcrumbsEnabled = true;
config.handlePromiseRejections = true;
config.autoNotify = true;

export const bugsnag = new Client(config);
