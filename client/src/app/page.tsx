"use client";
import { SessionProvider, signIn } from "next-auth/react";

export default function Home() {
  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);

  //     console.log("📁 File Selected:", selectedFile);
  //     console.log("  Name:", selectedFile.name);
  //     console.log("  Size:", (selectedFile.size / 1024).toFixed(2), "KB");
  //     console.log("  Type:", selectedFile.type);
  //     console.log(
  //       "  Last Modified:",
  //       new Date(selectedFile.lastModified).toLocaleString()
  //     );
  //   }
  // };

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!file) return alert("Please select a file first!");

  //   try {
  //     const fd = new FormData();
  //     fd.append("file", file); // ✅ correct

  //     const res = await fetch("/api/upload", {
  //       method: "POST",
  //       body: fd, // ✅ no custom headers
  //     });

  //     const response = await res.json();
  //     console.log("✅ Server Response:", response);
  //   } catch (error) {
  //     console.error("❌ Upload failed:", error);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email: "bilal@g.com",
      password: "bilal123",
      redirect: false,
    });
  };

  // return (
  //   <form onSubmit={onSubmit}>
  //     <input type="file" onChange={handleFileChange} />
  //     <button type="submit">Upload</button>
  //   </form>
  // );
  // if (session) {
  //   return (
  //     <div>
  //       <p>Welcome {session?.user?.username}</p>
  //       <p>Your token: {session?.accessToken}</p>
  //       <button onClick={() => signOut()}>Logout</button>
  //     </div>
  //   );
  // }

  return <SessionProvider>
    <button onClick={handleLogin}>Login</button>;
  </SessionProvider>
}
