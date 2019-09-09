import { platformBrowserDynamic } from 'angular-ts-decorators';
import { AppModule } from './app/app.module';

import './styles.css';

platformBrowserDynamic().bootstrapModule(AppModule, {strictDi: true});
