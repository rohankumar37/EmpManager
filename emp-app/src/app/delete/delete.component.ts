import { HtmlParser } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
})
export class DeleteComponent {
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
          <td><button id='deleteButton_${person._id}'>Delete</button></td>
        <tr>
      `;
    }
    (document.getElementById('personTable') as HTMLTableElement).innerHTML +=
      html;

    // add event listeners
    for (let person of data.data) {
      let button = document.getElementById(`deleteButton_${person._id}`);
      (button as HTMLButtonElement).addEventListener(
        'click',
        this.deletePerson.bind(this, person._id)
      );
    }
  }
  async deletePerson(id: string) {
    console.log('delete ' + id);
    let result = await fetch('http://localhost:5000/person/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let resJson = await result.json();
    if (resJson.status == 'success') alert('Person deleted successfully');
    // reload
    window.location.reload();
  }
}
