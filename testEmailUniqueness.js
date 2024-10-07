import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Function to Test Unique Email Constraint
async function testEmailUniqueness() {
  const email = 'unique@example.com';
  
  // Try adding a new user
  const newUser = {
    email: email,
    name: 'John Doe'
  };

  try {
    // Check if email already exists in the collection
    const snapshot = await db.collection('common_users').where('email', '==', email).get();
  
    if (snapshot.empty) {
      // Email is unique, proceed to add
      await db.collection('common_users').add(newUser);
      console.log('User added successfully.');
    } else {
      console.log('Email already exists!');
    }
  } catch (error) {
    console.error('Error checking email uniqueness:', error);
  }
}

// Run the test function
testEmailUniqueness();
