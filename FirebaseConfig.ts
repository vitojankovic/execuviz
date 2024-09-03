import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, getDoc, setDoc, getDocs, query, where } from "firebase/firestore";

//!!! JULIUS AI !!!

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkDfJl3jQeAj3wtZNG_vhq5UIZ5f33nu4",
  authDomain: "execuviz.firebaseapp.com",
  projectId: "execuviz",
  storageBucket: "execuviz.appspot.com",
  messagingSenderId: "646065252709",
  appId: "1:646065252709:web:391365a3d4ca5170ea598c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const addCompany = async (founder: string, name: string, password: string, description: string, industry: string, location: string, team: string, products: string, revenueData: string, efficiency: string) => {
  try {
    const docRef = await addDoc(collection(db, "companies"), {
      founder: founder,
      name: name,
      password: password,
      description: description,
      industry: industry,
      location: location,
      team: team,
      products: products,
      monthlyData: revenueData,
      efficiency: efficiency
      });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getCompany = async (companyId: string) => {
  try {
    const docRef = doc(db, "companies", companyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document:", e);
    return null;
  }
};

const addUser = async (username: string, email: string, password: string): Promise<string | null> => {
  try {
    const authInstance = getAuth();
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    const userUID = userCredential.user.uid;

    const docRef = doc(db, "users", userUID);
    await setDoc(docRef, {
      username: username,
      email: email,
      password: password,
    });

    console.log("Document written with ID: ", userUID);
    return userUID; // Return userUID after successful document creation
  } catch (e) {
    console.error("Error adding document: ", e);
    return null; // Return null in case of an error
  }
};

const addToUser = (userId: string, description: string, location: string, industry: string, role: string, department: string): Promise<void> => {
  console.log(`Adding description '${description}' to user with ID ${userId}`);
  const userRef = doc(db, "users", userId);
  return setDoc(
    userRef,
    {
      description: description,
      industry: industry,
      location: location,
      role: role,
      department: department
    },
    { merge: true }
  )
    .then(() => {
      console.log("Description, location, role, and department successfully added to the user.");
    })
    .catch((error) => {
      console.error("Error adding information to the user: ", error);
    });
};

const getCompaniesByFounder = async (userId: string) => {

  const companiesRef = collection(db, "companies");
  const q = query(companiesRef, where("founder", "==", userId));

  const querySnapshot = await getDocs(q);
  const companies: any[] = [];

  querySnapshot.forEach((doc) => {
    companies.push({ id: doc.id, ...doc.data() });
  });

  return companies;
};


const getUserByEmail = async (email: string) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      return { uid: querySnapshot.docs[0].id, username: user.username };
    } else {
      console.log('No user found with the provided email!');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    return null;
  }
};

const getUserInfo = async (username: string) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      const { email, department, description, industry, location, password, role, username } = user;
      return { email, department, description, industry, location, password, role, username };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user info:', error);
    throw error;
  }
};

const updateTeam = async (companyid: string, team: string) => {
  try {
    const companyRef = doc(db, 'companies', companyid);
    await setDoc(companyRef, { team: team }, { merge: true });
    console.log("Document successfully updated!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}


const getCompanyPlan = async (companyname: string) => {
  try {
    const docRef = doc(db, "companies", companyname);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists() && "plan" in docSnap.data()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document or no 'plan' property!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document:", e);
    return null;
  }
};

export { auth, db, addUser, addCompany, getCompany, getUserByEmail, addToUser, getUserInfo, getCompaniesByFounder, updateTeam, getCompanyPlan };