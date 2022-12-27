import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor() {
    this.personIdToEdit = '';
    this.persons = [];
  }
  personIdToEdit: string;
  persons: any[];

  async ngOnInit() {
    let result = await fetch('http://localhost:5000/person');
    let data = await result.json();
    console.log(data);
    let html = '';
    this.persons = data.data;
    for (let person of this.persons) {
      html += `
        <tr>
          <td>${person._id}</td>
          <td>${person.name}</td>
          <td>${person.age}</td>
          <td>${person.gender}</td>
          <td>${person.contact}</td>
          <td><button id='editButton_${person._id}'>Edit</button></td>
        <tr>
      `;
    }
    (document.getElementById('personTable') as HTMLTableElement).innerHTML +=
      html;

    // add event listeners
    for (let person of data.data){
      let button = document.getElementById(`editButton_${person._id}`);
      (button as HTMLButtonElement).addEventListener('click', this.editPerson.bind(this, person._id));
    }
  }

  editPerson(id: string) {
    this.personIdToEdit = id;
    console.log('edit ' + id);
    (document.getElementById('editnameinput') as HTMLInputElement).value = this.persons.find(person => person._id == id).name;
    (document.getElementById('editageinput') as HTMLInputElement).value = this.persons.find(person => person._id == id).age;
    (document.getElementById('editgenderinput') as HTMLInputElement).value = this.persons.find(person => person._id == id).gender;
    (document.getElementById('editcontactinput') as HTMLInputElement).value = this.persons.find(person => person._id == id).contact;
  }

  async submit() {
    console.log('edit ' + this.personIdToEdit);
    let result = await fetch('http://localhost:5000/person/' + this.personIdToEdit, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: (document.getElementById('editnameinput') as HTMLInputElement).value,
        age: (document.getElementById('editageinput') as HTMLInputElement).value,
        gender: (document.getElementById('editgenderinput') as HTMLInputElement).value,
        contact: (document.getElementById('editcontactinput') as HTMLInputElement).value
      })
    });
    
    let resJson = await result.json();
    if (resJson.status == 'success') alert('Person edited successfully');
    // reload
    window.location.reload();
  }
}
