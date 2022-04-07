import { ref, watchEffect } from "vue"
import { projectFirestore } from "../firebase/config"

const getCollection = (collection) => {
   const documents = ref(null)
   const error = ref(null)

   let collectionRef = projectFirestore.collection(collection)
      .orderBy('createdAt', "desc")
   
   const unsub = collectionRef.onSnapshot((snap) => {
      let results = []
      snap.docs.forEach(doc => {
         doc.data().createdAt && results.push({... doc.data(), id: doc.id })
      })
      documents.value = results
   }, (err) => {
      documents.value = null
      error.value = 'could not fetch data'
   })
   watchEffect((onInvalidate) => {
      // Unsibscribe when the watcher is stopped
      onInvalidate(() => unsub())
   })
   return { documents, error }
}

export default getCollection 