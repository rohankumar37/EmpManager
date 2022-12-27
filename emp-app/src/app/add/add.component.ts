import { Component } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  constructor() {}

  async submit() {
    let name = (document.getElementById('addnameinput') as HTMLInputElement).value;
    let age = parseInt((document.getElementById('addageinput') as HTMLInputElement).value);
    let gender = (document.getElementById('addgenderinput') as HTMLInputElement).value.toLowerCase();
    let contact = (document.getElementById('addcontactinput') as HTMLInputElement).value;

    let data = { name, age, gender , contact };
    console.log(data);

    // validate

    let result = await fetch('http://localhost:5000/person', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    let resJson = await result.json();
    if (resJson.status == 'success') alert('Person added successfully');

    //reload
    window.location.reload();
    return false;
  }
}
