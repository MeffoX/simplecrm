import { Component, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  users$: Observable<any[]>;
  user = new User();
  birthdate: Date = new Date();

  constructor() {
    const aCollection = collection(this.firestore, 'items');
    this.users$ = collectionData(aCollection);
  }

  async saveUser() {
    this.user.birthdate = this.birthdate.getTime();
    console.log('Current User is', this.user);

    try {
      const docRef = await addDoc(collection(this.firestore, 'users'), this.user.toJSON());
      console.log('Adding user finished', docRef.id);
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }
}
