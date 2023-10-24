import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  users$: Observable<any[]> | undefined;
  user: User;
  loading = false;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: Firestore  // <- Hier die Änderung
  ) {
    this.user = data.user!;
    
  }
  

  async saveUser() {
    console.log('Updating User', this.user);
    this.loading = true;
    const userDocRef = doc(this.firestore, 'users', this.user.customID); 
  
    try {
      await updateDoc(userDocRef, this.user.toJSON());
      console.log('Updating user finished');
    } catch (error) {
      console.error('Error updating user: ', error);
    } finally {
      this.loading = false;
      this.dialogRef.close();
    }
  }


  closeDialog() {
        this.dialogRef.close();
  }
}
