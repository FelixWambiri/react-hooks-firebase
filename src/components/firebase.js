import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGs1YP66WkFqAmaSe2Oy14tAICDDv32oc",
  authDomain: "quotesapp-41df8.firebaseapp.com",
  databaseURL: "https://quotesapp-41df8.firebaseio.com",
  projectId: "quotesapp-41df8",
  storageBucket: "quotesapp-41df8.appspot.com",
  messagingSenderId: "1095702440774",
  appId: "1:1095702440774:web:a9ea0d7a23f5ac26"
};

class FireBase {
  constructor(){
    // Initialize Firebase
    app.initializeApp(firebaseConfig);
    this.auth = app.auth()
    this.db = app.firestore()
  }

  login(email, password){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  async register(name, email, password){
    await this.auth.createUserWithEmailAndPassword(email, password)
    return this.auth.currentUser.updateProfile({
      displayName: name,
    })
  }

  addQuote(quote){
    if(!this.auth.currentUser){
      return alert('Not authorized');
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote
    })
  }

  isInitialized(){
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    })
  }

  getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
  }

  async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new FireBase();