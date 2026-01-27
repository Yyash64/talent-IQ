import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import toast from "react-hot-toast"; 
function HomePage() {
  return (
    <div>
      <button className="btn btn-secondary" onClick={()=>toast.success("this is a success Toast")}>ClickMe</button>

      <SignedOut>
        <SignInButton mode="modal">
          <button>Log In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <SignOutButton />
      </SignedIn>
    </div>
  );
}

export default HomePage;
