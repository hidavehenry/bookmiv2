

export const usePhotoUpload = (file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL})

  setLoading(false);
  alert('File uploaded!')

  
  return (
    <div>
      
    </div>
  )
}
