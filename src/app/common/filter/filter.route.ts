import { Routes } from '@angular/router';
import { FilterComponent } from './filter.component';
import { MainComponent } from '../../layouts';

export const FILTER_ROUTE: Routes = [
	{
		path: '',
		component: MainComponent,
		children: [
			{
				path: 'filter',
				component: FilterComponent
			}
		]
	}
];

