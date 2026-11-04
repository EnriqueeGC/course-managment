import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { SidebarNav } from './sidebar-nav';
import type { NavigationItem } from './navigation-items';

interface MobileSidebarProps {
  items: NavigationItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileSidebar({
  items,
  open,
  onOpenChange,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[18rem] bg-white p-0 dark:bg-gray-800"
      >
        <SheetHeader className="p-5 pb-0">
          <SheetTitle className="text-lg">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Role-based application navigation
          </SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <SidebarNav items={items} onNavigate={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
