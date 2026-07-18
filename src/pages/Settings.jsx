import { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast } from "sonner";

function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // profile fields
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");

  // password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // load current profile info
  useEffect(() => {
    const loadProfile = async () => {
      if (!auth.currentUser) return;

      try {
        setDisplayName(auth.currentUser.displayName || "");
        setEmail(auth.currentUser.email || "");

        const snap = await getDoc(doc(db, "users", auth.currentUser.uid));

        if (snap.exists()) {
          const data = snap.data();
          setPhone(data.phone || "");
          setBusinessName(data.businessName || "");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    const wantsPasswordChange = newPassword.trim() !== "";
    const emailChanged = email.trim() !== auth.currentUser.email;

    if (wantsPasswordChange && newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match.");
      return;
    }

    if (wantsPasswordChange && newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if ((wantsPasswordChange || emailChanged) && !currentPassword) {
      toast.error("Enter your current password to change email or password.");
      return;
    }

    try {
      setSaving(true);

      // re-authenticate first if email or password is being changed
      if (wantsPasswordChange || emailChanged) {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPassword
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      }

      // update display name
      if (displayName.trim() !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: displayName.trim(),
        });
      }

      // update email
      if (emailChanged) {
        await updateEmail(auth.currentUser, email.trim());
      }

      // update password
      if (wantsPasswordChange) {
        await updatePassword(auth.currentUser, newPassword);
      }

      // update extra profile info in firestore
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        {
          phone: phone.trim(),
          businessName: businessName.trim(),
          updatedAt: new Date(),
        },
        { merge: true }
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/wrong-password") {
        toast.error("Current password is incorrect.");
      } else if (error.code === "auth/requires-recent-login") {
        toast.error("Please log out and log back in, then try again.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("That email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address.");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6 lg:p-8">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-slate-500 mt-1">
              Update your profile information and password.
            </p>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 mt-8 p-12 text-center text-slate-400">
              Loading your profile...
            </div>
          ) : (
            <form
              onSubmit={handleSave}
              className="bg-white rounded-2xl shadow-sm border border-indigo-100/50 mt-8 p-6 lg:p-8 max-w-2xl"
            >
              {/* Profile Info */}
              <div>
                <h2 className="text-lg font-semibold text-slate-900 mb-5">
                  Profile Information
                </h2>

                <div className="grid gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                      <User size={16} className="text-indigo-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                      <Mail size={16} className="text-indigo-400" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                      <Phone size={16} className="text-indigo-400" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712 345 678"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                      <Briefcase size={16} className="text-indigo-400" />
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Your business or freelance name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 mb-1.5">
                  Change Password
                </h2>
                <p className="text-sm text-slate-400 mb-5">
                  Leave the new password fields blank if you don't want to change it.
                </p>

                <div className="grid gap-5">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                      <Lock size={16} className="text-indigo-400" />
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Required to change email or password"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-1.5 flex items-center gap-2">
                        <Lock size={16} className="text-indigo-400" />
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((v) => !v)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600 mb-1.5">
                        Confirm New Password
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  <Save size={18} />
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;