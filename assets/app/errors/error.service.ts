import {EventEmitter} from "@angular/core";
import {Error} from "./error";

export class ErrorService {
	errorOccurred = new EventEmitter<Error>();

	handleError(error: any) {
		var errorData;
		if (error._body) {
			errorData = new Error('', '', error._body);
		}
		else {
			errorData = new Error(error.message, error.error);
		}
		this.errorOccurred.emit(errorData);
	}
}