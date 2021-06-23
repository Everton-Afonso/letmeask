import { createContext, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextTypes = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextTypes);

function App() {
  const [user, setUser] = useState<User>();

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Accounts");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, singInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/roons/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
