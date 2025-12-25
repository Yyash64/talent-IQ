import "./App.css";
import { SignedIn, SignInButton, SignOutButton,UserButton ,SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <h1>Welcome to teh app</h1>
      <SignedOut>
        <SignInButton mode="modal" >
          <button >Login</button> 
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <UserButton />
    </>
  );
}

export default App;
