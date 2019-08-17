import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [],
	exports: [
		FormsModule,
		HttpClientModule,
		CommonModule
	]
})
export class SharedLibsModule { }
