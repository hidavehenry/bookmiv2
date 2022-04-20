import { auth } from '../firebase/config'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const useGoogleSignup = () => {
  const navigate = useNavigate()

  const provider = new GoogleAuthProvider();

    //Sign up with Google pop up
  const googleSignup = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return { googleSignup }
}
