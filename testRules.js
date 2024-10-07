import * as firebase from '@firebase/testing';

const projectId = 'your-project-id'; // Replace with your project ID

const getFirestore = (auth) => firebase.initializeTestApp({ projectId, auth }).firestore();

describe('Firestore Security Rules', () => {
  beforeEach(async () => {
    await firebase.clearFirestoreData({ projectId });
  });

  afterAll(async () => {
    await Promise.all(firebase.apps().map(app => app.delete()));
  });

  it('should allow a user to read and write their own document in common_users', async () => {
    const userId = 'user123';
    const db = getFirestore({ uid: userId });

    // Test read/write
    await firebase.assertSucceeds(db.doc(`common_users/${userId}`).set({
      email: 'user@example.com',
      id: 1,
      name: 'User Name',
      role: 'user'
    }));

    await firebase.assertFails(db.doc(`common_users/${userId}`).update({
      name: 'New Name'
    }));
  });

  // Add more tests for other rules...
});
