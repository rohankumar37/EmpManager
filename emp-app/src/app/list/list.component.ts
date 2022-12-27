import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor() {}

  async ngOnInit() {
    let result = await fetch('http://localhost:5000/person');
    let data = await result.json();
    console.log(data);
    let html = '';
    for (let person of data.data) {
      html += `
        <tr>
          <td>${person._id}</td>
          <td>${person.name}</td>
          <td>${person.age}</td>
          <td>${person.gender}</td>
          <td>${person.contact}</td>
        <tr>
      `;
    }
    (document.getElementById('personTable') as HTMLTableElement).innerHTML += html;
  }
};