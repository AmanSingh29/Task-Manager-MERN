import Navbar from "./NavBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gray-100 p-6 h-full">{children}</main>
    </div>
  );
}
