import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class RegistrarUsuario {

    constructor(private http: HttpClient) { }
  
  
    BaseUrl = "http://localhost:8080/api";
  
    private extractData(res: Response) {
      let body = res;
      return body || { };
    }

    // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
    })
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}

//registrar usuario
setNewUser(newEmprendedor): Observable<any>{
    let json = JSON.stringify(newEmprendedor);
      return this.http.post(this.BaseUrl+"/registro", json , this.httpOptions)
      .pipe(
        map(this.extractData),
        catchError(this.errorHandl)
      );
  }

  //obtenerUsuarios
  getAllUsers(): Observable<any> {
    return this.http.get(this.BaseUrl+"/getAll")
      .pipe(
        map(this.extractData),
        catchError(this.errorHandl)
      );
  }

  //borrarUsuario
  delete(cedula): Observable<any> {
    return this.http.delete(this.BaseUrl+"/"+cedula).pipe(
      map(this.extractData),
      catchError(this.errorHandl)
    );
  }

}