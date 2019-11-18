import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route:ActivatedRoute) {
    this.user$= afAuth.authState;
   }

   login(){
    //pre nego sto se korisnik redirektuje na google, sacuva se query param iz url-a gde je hteo da ide pa je poslat na login
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   logout(){
    this.afAuth.auth.signOut();
   }
}
