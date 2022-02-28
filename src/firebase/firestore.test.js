import {
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing"
import fs from 'fs';
import { createEvent, initDB } from "./firestore";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
let testEnv;

describe('firestore test', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: fs.readFileSync("firestore.rules", "utf8"),
        host: "localhost",
        port: 8080,
      },
    });
    const firebase = testEnv.unauthenticatedContext();
    initDB(firebase.firestore());
  });

  it('create event', async () => {
    const event = {
      title: '여수 여행',
      description: '즐거운 여수 여행',
    }

    const ref = await assertSucceeds(createEvent(event));
    expect(ref.id).toBeDefined();
  });

})