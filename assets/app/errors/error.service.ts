import {EventEmitter} from "@angular/core";
import {Error} from "./error";

export class ErrorService {
	errorOccurred = new EventEmitter<Error>();

	handleError(error: any) {
		//const errorData = new Error(error.title, error.error);
		const errorData = new Error(error.message, error.error);
		this.errorOccurred.emit(errorData);
	}
}