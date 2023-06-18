import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {
    constructor(){}
    downloadFile(value:any) {
    // Sample CSV data
    var tmp = value;
    var csvData = "Name,Email\nJohn Doe,johndoe@example.com\nJane Smith,janesmith@example.com";

    // Create a Blob object from the CSV data
    var blob = new Blob([csvData], { type: 'text/csv' });

    // Create a temporary anchor element
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';

    // Append the anchor element to the body
    document.body.appendChild(link);

    // Programmatically trigger the download
    link.click();

    // Clean up the temporary anchor element
    document.body.removeChild(link);
  }
}
