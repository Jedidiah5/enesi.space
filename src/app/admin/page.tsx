import { AdminClient } from "@/components/admin/AdminClient";
import { Win95Desktop } from "@/components/win95/Win95Desktop";
import { Win95MenuBar } from "@/components/win95/Win95MenuBar";
import { Win95Taskbar } from "@/components/win95/Win95Taskbar";
import { Win95Window } from "@/components/win95/Win95Window";

export default function AdminPage() {
  return (
    <Win95Desktop>
      <main className="flex min-h-0 flex-1 justify-center px-2 pb-2 pt-3 md:px-3">
        <Win95Window
          title="Admin — Control Panel"
          icon={<span className="text-[14px]">⚙</span>}
          menu={<Win95MenuBar />}
          titleTone="orange"
          className="flex h-[calc(100dvh-2.75rem)] max-h-[920px] w-full max-w-4xl min-h-0 flex-col"
        >
          <div className="win95-sunken m-1 flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <AdminClient />
            </div>
          </div>
        </Win95Window>
      </main>
      <Win95Taskbar active="admin" />
    </Win95Desktop>
  );
}
