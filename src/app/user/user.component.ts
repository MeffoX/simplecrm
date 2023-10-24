import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  allUsers: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit() {
    const aCollection = collection(this.firestore, 'users');
    collectionData(aCollection, { idField: 'customID' }).subscribe(dataArray => {
      // Assuming dataArray is an array of objects with User properties
      this.allUsers = dataArray as User[];
      console.log('All Users:', this.allUsers);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      // perform actions while closing
    });
  }
}