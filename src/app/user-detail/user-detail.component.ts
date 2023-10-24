import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private firestore: Firestore) {}

  ngOnInit(): void {
    // catch id from the url
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      getDoc(userDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            this.user = new User(userData);
            this.user.customID = this.userId;
            console.log('User Data:', this.user);
          } else {
            console.log('User not found');
          }
        });
    }
  }

  editMenu() {
    const dialogRef = this.dialog.open(DialogEditAddressComponent, {
        data: { user: new User(this.user?.toJSON()) }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.fetchUserData();
    });
}


  editUserDetail() {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      data: { user: new User(this.user?.toJSON()) }
    });

    dialogRef.afterClosed().subscribe(() => {
        this.fetchUserData();
    });
  }

  fetchUserData() {
    if (this.userId) {
        const userDocRef = doc(this.firestore, 'users', this.userId);
        getDoc(userDocRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    this.user = new User(userData);
                    this.user.customID = this.userId; 
                    console.log('User Data:', this.user);
                } else {
                    console.log('User not found');
                }
            });
    }
  }
}